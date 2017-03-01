from flask import Flask
from flask import request
from flask import make_response
from flask_restful import Resource, Api, reqparse
import os

app = Flask(__name__)
api = Api(app)

class HelloWorld(Resource):
	def get(self):
		return {'hello': 'world'}

class WebHook(Resource):
	def get(self):
		args = request.args
		verify_token = 'python_rocks'

		if args.get('hub.mode') == 'subscribe' and args.get('hub.verify_token') == verify_token:
			print('validating webhook')
			return make_response(args.get('hub.challenge').strip("\n\""))
		else:
			print('Failed validation. Make sure the \
				validation tokens match')
			# abort(403)


api.add_resource(HelloWorld, '/')
api.add_resource(WebHook, '/webhook')

if __name__ == '__main__':
	port = int(os.environ.get("PORT", 5000))
	app.run(host='0.0.0.0', port=port)





























