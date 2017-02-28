from flask import Flask
from flask import request
from flask_restful import Resource, Api, reqparse

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
			return args.get('hub.challenge')
		else:
			print('Failed validation. Make sure the \
				validation tokens match')
			# abort(403)


api.add_resource(HelloWorld, '/')
api.add_resource(WebHook, '/webhook')

if __name__ == '__main__':
	app.run(debug=True)





























