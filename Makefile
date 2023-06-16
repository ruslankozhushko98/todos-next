run:
	docker run -d -p 3000:3000 --env-file ./.env.local -v data:/app/data --rm --name todos-next rkozhushko/todos-next:latest
run-dev:
	docker run -d -p 3000:3000 --env-file ./.env.local -v "/Users/rkozhushko/projects/test-next-app:/app" -v /app/node_modules -v data:/app/data --rm --name todos-next rkozhushko/todos-next:latest
push:
	docker push rkozhushko/todos-next:latest
pull:
	docker pull rkozhushko/todos-next:latest
stop:
	docker stop todos-next
