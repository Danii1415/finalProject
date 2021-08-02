from core.validator import Validator
from core.db.database import DB


class Student(object):
    def __init__(self, database):
        self.validator = Validator()
        self.db = database

        self.collection_name = 'students'  # collection name

        self.fields = {
            "firstName": "string",
			"lastName": "string",
			"mail": "string",
			"id": "string",
            "created": "datetime",
            "updated": "datetime"
        }

        self.create_required_fields = ["firstName", "lastName", "mail", "id"]

        # Fields optional for CREATE
        self.create_optional_fields = []

        # Fields required for UPDATE
        self.update_required_fields = ["firstName", "lastName", "mail", "id"]

        # Fields optional for UPDATE
        self.update_optional_fields = []

    def create(self, student):
        # Validator will throw error if invalid
        self.validator.validate(student, self.fields, self.create_required_fields, self.create_optional_fields)
        res = self.db.insert(student, self.collection_name)
        return res #Inserted Id

    def find(self, student):  # find all
        return self.db.find(student, self.collection_name)

    def find_by_id(self, id):
        return self.db.find_by_id(id, self.collection_name)

    def update(self, id, student):
        self.validator.validate(student, self.fields, self.update_required_fields, self.update_optional_fields)
        return self.db.update(id, student,self.collection_name)

    def delete(self, id):
        return self.db.delete(id, self.collection_name)