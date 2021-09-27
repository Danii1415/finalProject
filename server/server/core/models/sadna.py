from core.validator import Validator
from core.db.database import DB


class Sadna(object):
    def __init__(self, database):
        self.validator = Validator()
        self.db = database

        self.collection_name = 'sadnas'  # collection name

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

    def create(self, sadna):
        # Validator will throw error if invalid
        self.validator.validate(sadna, self.fields, self.create_required_fields, self.create_optional_fields)
        res = self.db.insert(sadna, self.collection_name)
        return res

    def find(self, sadna):  # find all
        return self.db.find(sadna, self.collection_name)

    def find_by_id(self, id):
        return self.db.find_by_id(id, self.collection_name)

    def update(self, id, sadna):
        self.validator.validate(sadna, self.fields, self.update_required_fields, self.update_optional_fields)
        return self.db.update(id, sadna,self.collection_name)

    def delete(self, id):
        return self.db.delete(id, self.collection_name)