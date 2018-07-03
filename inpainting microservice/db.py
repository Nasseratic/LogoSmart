from peewee import FloatField,CharField,UUIDField,Model,SqliteDatabase,Check


db = SqliteDatabase('./db.sqlite')

class BaseModel(Model):
    class Meta:
        database = db


class User(BaseModel):
    id = UUIDField( primary_key=True, unique=True)
    traffic_quota = FloatField()
    traffic = FloatField(constraints=[Check('traffic <= traffic_quota')])

class Log(BaseModel):
    user_id = CharField(unique=True,max_length=20)
    action = CharField(max_length=30)
    traffic_use = FloatField()

# db.connect()
# db.create_tables([User, Log])
