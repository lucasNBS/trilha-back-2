from rest_framework.exceptions import APIException
from rest_framework.status import HTTP_400_BAD_REQUEST

class OperationUnavailable(APIException):
  status_code = HTTP_400_BAD_REQUEST
  