
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import json
import sqlite3

BASE_DIR = Path(__file__).resolve().parent

class FoodLoopServer(SimpleHTTPRequestHandler):

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(BASE_DIR), **kwargs)

    def do_GET(self):

        if self.path == "/api/reports":
            db = sqlite3.connect(BASE_DIR / "foodloop.db")
            db.row_factory = sqlite3.Row

            food = db.execute("""
                SELECT COALESCE(SUM(quantity_delivered), 0)
                FROM collections
                WHERE status = 'Completed'
            """).fetchone()[0]

            completed = db.execute("""
                SELECT COUNT(*) FROM collections
                WHERE status = 'Completed'
            """).fetchone()[0]

            pending = db.execute("""
                SELECT COUNT(*) FROM collections
                WHERE status IN ('Requested', 'Approved', 'Assigned')
            """).fetchone()[0]

            users = db.execute("""
                SELECT COUNT(*) FROM users
                WHERE active = 1
            """).fetchone()[0]

            db.close()

            data = {
                "foodSaved": food,
                "completed": completed,
                "pending": pending,
                "users": users
            }

            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(data).encode())
            return

        if self.path == "/":
            self.path = "/pages/login.html"

        return super().do_GET()


if __name__ == "__main__":
    from database import create_database

    create_database()

    server = HTTPServer(("localhost", 8000), FoodLoopServer)

    print("FoodLoop is running!")
    print("Open http://localhost:8000")

    server.serve_forever()
