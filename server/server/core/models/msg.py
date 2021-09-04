from core.validator import Validator
from core.db.database import DB


class Msg(object):
    def __init__(self, database):
        self.validator = Validator()
        self.db = database

        self.collection_name = 'projects'  # collection name

        self.fields = {
            "name": "string",
            "text": "string",
            "projectId": "string",
            "fromTeacher": "bool",
            "created": "datetime",
            "updated": "datetime"
        }

        self.create_required_fields = ["name", "text", "projectId", "fromTeacher"]

        # Fields optional for CREATE
        self.create_optional_fields = []

        # Fields required for UPDATE
        self.update_required_fields = ["name", "text", "projectId", "fromTeacher"]

        # Fields optional for UPDATE
        self.update_optional_fields = []

    def create(self, msg):
        # Validator will throw error if invalid
        self.validator.validate(msg, self.fields, self.create_required_fields, self.create_optional_fields)
        res = self.db.insert(msg, self.collection_name)
        return "Inserted Id " + res

    def find(self, msg):  # find all
        return self.db.find(msg, self.collection_name)

    def find_by_id(self, id):
        return self.db.find_by_id(id, self.collection_name)

    def update(self, id, msg):
        self.validator.validate(msg, self.fields, self.update_required_fields, self.update_optional_fields)
        return self.db.update(id, project,self.collection_name)

    def delete(self, id):
        return self.db.delete(id, self.collection_name)