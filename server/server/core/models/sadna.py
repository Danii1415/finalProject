from core.validator import Validator
from core.db.database import DB


class Course(object):
    def __init__(self, database):
        self.validator = Validator()
        self.db = database

        self.collection_name = 'courses'  # collection name

        self.fields = {
            "name": "string",
            "created": "datetime",
            "updated": "datetime"
        }

        self.create_required_fields = ["name"]

        # Fields optional for CREATE
        self.create_optional_fields = []

        # Fields required for UPDATE
        self.update_required_fields = ["name"]

        # Fields optional for UPDATE
        self.update_optional_fields = []

    def create(self, course):
        # Validator will throw error if invalid
        self.validator.validate(course, self.fields, self.create_required_fields, self.create_optional_fields)
        res = self.db.insert(course, self.collection_name)
        return res

    def find(self, course):  # find all
        return self.db.find(course, self.collection_name)

    def find_by_id(self, id):
        return self.db.find_by_id(id, self.collection_name)

    def update(self, id, course):
        self.validator.validate(course, self.fields, self.update_required_fields, self.update_optional_fields)
        return self.db.update(id, course,self.collection_name)

    def delete(self, id):
        return self.db.delete(id, self.collection_name)