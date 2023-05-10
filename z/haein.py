from pymongo import MongoClient
client = MongoClient('localhost', 27017)
db = client.haein

doc = {'name':'bobby','age':21}
db.users.insert_one(doc)
print(db.haein.)

