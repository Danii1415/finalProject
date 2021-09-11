from core.validator import Validator
from core.db.database import DB


class Project(object):
    def __init__(self, database):
        self.validator = Validator()
        self.db = database

        self.collection_name = 'projects'  # collection name

        self.fields = {
            "title": "string",
            "teacherId": "string",
            "workshopId": "string",
            "studentList": "list",
            "imgLink": "string",
            "preview": "string",
			"status": "string",
			"githubLink": "string",
			"contactName": "string",
			"contactPhone": "string",
			"contactEmail": "string",
			"lastUpdateByStudent": "string",
            "number": "int",
            "imageIsOld": "bool",
            "created": "datetime",
            "updated": "datetime"
        }

        self.create_required_fields = ["title", "teacherId", "workshopId", "studentList", "imgLink", "preview"
						, "status", "githubLink", "contactName", "contactPhone", "contactEmail"
                        , "lastUpdateByStudent", "number", "imageIsOld"]

        # Fields optional for CREATE
        self.create_optional_fields = []

        # Fields required for UPDATE
        self.update_required_fields = ["title", "teacherId", "workshopId", "studentList", "imgLink", "preview"
						, "status", "githubLink", "contactName", "contactPhone", "contactEmail"
                        , "lastUpdateByStudent", "number", "imageIsOld"]

        # Fields optional for UPDATE
        self.update_optional_fields = []

    def create(self, project):
        # Validator will throw error if invalid
        self.validator.validate(project, self.fields, self.create_required_fields, self.create_optional_fields)
        res = self.db.insert(project, self.collection_name)
        return "Inserted Id " + res

    def find(self, project):  # find all
        return self.db.find(project, self.collection_name)

    def find_by_id(self, id):
        return self.db.find_by_id(id, self.collection_name)

    def update(self, id, project):
        self.validator.validate(project, self.fields, self.update_required_fields, self.update_optional_fields)
        return self.db.update(id, project,self.collection_name)

    def delete(self, id):
        return self.db.delete(id, self.collection_name)