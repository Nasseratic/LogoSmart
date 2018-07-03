from pymongo import MongoClient
from bson.objectid import ObjectId
from config import dbConnectionString

client = MongoClient(dbConnectionString)

db = client['inpaint_db']

logs = db['logs']


def add_log(obj):
    return db['logs'].insert_one(obj)

# -------------------- deprecated ---------------------- 
# def update_or_create_user(id,obj):
#     user = db['user'].find({"_id": ObjectId(id)})
#     if(user):
#        return db['user'].update_one({"_id": ObjectId(id)},{"$set": obj})
#     else:
#         return db['user'].insert_one(obj)