# Tasks App

The Tasks app is a real-time collaborative task management tool where tasks and their subtasks can be created, shared and completed. It also allows for costs/prices to be associated with tasks or subtasks, and provides the aggregated sum of subtasks in parent tasks.

## User Stories
1. I as a user can create to-do items, such as a grocery list.
2. I, as another user, can collaborate in real-time with other users.
3. I as a user can mark to-do items as "done".
4. I as a user can add sub-tasks to my to-do items.
5. I as a user can specify cost/price for a task or a subtask.
6. I as a user can see the sum of the subtasks aggregated in the parent task.
7. I as a user can create multiple to-do lists where each list has its unique URL.
8. I as a user can be sure that my todos will be persisted.
9. I as an owner/creator of a certain to-do list can freeze/unfreeze.
10. I as a user can filter the to-do list and view items that were marked as done.
11. I as a user can reset my password through my email and change it.

## Developer Notes
1. OpenApi documentation is generated based on the input validations
2. Frontend types are generated based on the OpenApi documentation

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development purposes.

### Prerequisites

Ensure node.js is installed on your machine. The minimum version required is 20.10.0.

### Installation

1. Clone this repo from github.

2. Install all the dependencies using the following command:
npm install


### Commands

Build the project:
npm run build

Copy code


Start the project:
```
npm run start
```

Run the tests:

```
npm run test
```

Generate test coverage report:

```
npm run test:coverage
```

### Docker commands

Start Docker:

```
npm run docker:up
```

Stop Docker:

```
npm run docker:down
```

### Database Migration

Migrate your database:

```
npm run sequelize:migrate
```
