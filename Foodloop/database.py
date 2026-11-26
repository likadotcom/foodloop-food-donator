
import sqlite3

def connect():
    return sqlite3.connect("foodloop.db")


def create_database():

    db = connect()
    cursor = db.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            role TEXT NOT NULL,
            organisation TEXT,
            phone TEXT,
            active INTEGER DEFAULT 1
        )
    """)

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS collections (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            business_id INTEGER NOT NULL,
            recipient_id INTEGER,
            driver_id INTEGER,
            food_type TEXT NOT NULL,
            quantity_requested REAL NOT NULL,
            quantity_collected REAL DEFAULT 0,
            quantity_delivered REAL DEFAULT 0,
            collection_address TEXT NOT NULL,
            collection_date TEXT NOT NULL,
            status TEXT DEFAULT 'Requested'
        )
    """)

    db.commit()
    db.close()

    print("FoodLoop database created successfully!")


if __name__ == "__main__":
    create_database()