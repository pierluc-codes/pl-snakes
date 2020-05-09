up:
	docker-compose up --build

enter:
	docker-compose exec node bash

tc: 
	docker-compose exec node tsc --noEmit

test:
	docker-compose exec node yarn run test