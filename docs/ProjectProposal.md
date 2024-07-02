# Recipe searching app

## Application Definition Statement

*A clear high-level summary should be used to introduce the concept. This should be similar to an elevator pitch or a conversational reply to "What are you building?”. You will explore the audience and their demographics, the problem they are having, and your solution in subsequent sections in more detail but touch on them here.* 

*Clarity over quantity should be the focus, to that end, creating visuals/charts to explain the more complex data or logical points could help to reinforce your Application’s Definition Statement.*
<br>
I will be creating a food recipe searching app using the Spoonacular API. It will allow users to search for recipes of different foods and allow them to favorite those recipes to find those recipes more easily later on.This will require a user database that stores both login information and favorited recipes. I will be using React to create my frontend and Mongo, Express, and Node to create my backend.


## Target Market

*Using Primary and Secondary research, describe the people most likely to be utilizing your application. What are their ages, education level, employment sector, income level, hobbies, or any other defining characteristics that set them apart from other groups of people? Identifying specific groups will help drive application design choices.*

*Primary Research is research that you have conducted yourself and is not based on secondary sources. Examples of Primary Research include surveys, interviews, and focus groups. This doesn't have to be formal in nature and can include discussions you have with individuals that are likely users of your application. Secondary Research is research that has been conducted by others and is based on their findings. Examples of Secondary Research include market research reports, industry publications, and news articles.*
<br>
According to my research of a 30 person survey that was conducted and my own personal beliefs the primary target auidence is home cooks and their families. The survey indicates that 86.7% of people prefer homecooked meals compared to fast food. That same survey also tells us that 75.9% of people cook food. As well as that 76.7% of people are cooking for somebody else. With one of the most important stats being that 43.3% of people collect recipes. With the help of some data collected by a food and beverage analyst we can narrow our target auidence down even further. According to what they analyzed milennials cook the most often compared to three other generations. People with an income of 100k or more cook more often than people with less money and people with children cook more often. This means if we are going off of the data and want to target specfic people we should primarily target milennial families with children with an income of 100k or more.
<br>
https://medium.com/@velichko.botev/recipe-app-case-study-986af9c28207
<br>
https://pro.morningconsult.com/analysis/consumers-avid-recipe-users


## User Profile / Persona

*User profiles are a snapshot of an actual person and helps to open a window into the mind of an actual user and will provide insight while tailoring and refining interaction details to best fit your ideal users within your Target Market.*
<br>
Kacy is a 30 year old mother who cooks meals for her family.


## Use Cases

*A 'Use Case' describes how a user may interact with your application. It provides a series of steps to reach a desired result. If a user wants to listen to some music during a workout, how many clicks would it take to do that? Begin with a simple question like that and then map out the different steps to reach the desired goal. Use cases help us think through how our application will be used.*

*Use Cases help drive design decisions as well as testing procedures. During development we regularly test and confirm the work in progress matches up with our Use Cases. This provides valuable insight into how our application is addressing the needs of the user and allows us to correct missteps early. This [article](https://www.softwaretestinghelp.com/use-case-testing/) gives additional background Use Cases and Use Case Testing.*

- click on search bar
- search for food 
<br>

- click on search bar
- filter by ingredient.


## Problem Statement

*In a few sentences explain the problem your target market is seeing that requires this project to be built. This will identify why is your application needed and needs to be supported by Primary Research.*

The problem is people who can cook don't cook.

https://medium.com/@velichko.botev/recipe-app-case-study-986af9c28207


## Pain Points

*Explain your audience’s pain points that are contributing to their defined problem and their impact on the user. Primary Research should support your explanations.*
<br>
- Feeling tired and not having an easy recipe finder
- Takes a lot of time to figure out a meal
- Only sometimes knowing what exactly to cook
<br>
https://medium.com/@velichko.botev/recipe-app-case-study-986af9c28207

## Solution Statement

*How is your project going to solve the problem outlined above? Consider the competing products in your market space. What makes your solution different from other’s attempts to solve the problem? How are you able to better solve the defined problem for your audience than your competition?*
<br>
It will be an easy recipe finder, it will be simple to search for recipes, and it will be easy to find your favorited recipes. By utilizing a simple and visually appealing user interface with easy to use search and filtering capabilities allowing users to search not only by name but by ingredients I believe I can build a competitve recipe searching app.

## Competition

*What competing products exist to solve this or a similar problem? Identify and summarize competing products and how their approach to solving your identified problem differ from your own.*
<br>
Pinterest is competition but they aren't focused around just food so it shouldn't be difficult to beat them with better filtering like searching by ingredients. They use card images for search results instead of a text based approach like google I think I could combine text with images. Tasty is a larger concern since they are focused around just food. But I think by just having better filtering or a more appealing UI I could do better than them. I think that visuals, search speed, and recipe quality are the main factors that will make my app competitive. 


## Features & Functionality

*Define key features and functionality intended to provide solutions to specific problems and pain points you have identified. These key items should be specifically defined in response to problems / pain points.*

*A good way to identify a Key Feature is to use the phrase 'In order to [solve this problem] I need to [do this]'. For example, 'In order to listen to music while I workout I need to be able to create a playlist'.*

*Features and functionality should be prioritized based on their importance to the user. This will help you focus on the most important features first and then add additional features as time allows.*
<br>
- Filtering will allow filtering by ingredient names which should be built in functionality with the API I am using.
- Searching will allow searching by food name again should be built into the API I am using.
- Favoriting will allow you to heart or star foods to add them to a favorited list which will be stored with the user login info in the database.
- Filtering by type of food (POSSIBILY) if the API allows it I may allow users to filter by things like Italian.



## Integrations

*Use of an API is expected. This can be 3rd party APIs, your own API, or a combination of data sets. Identify which integrations are planned for and outline how you will use them transformatively. For 3rd party APIs provide links to their respective documentation and verify that your intended use complies with their Terms of Service.*
<br>
I will be building a user login API to store user data like login info and favorited recipes in the mongo database. I will then be using the Spoonacular API to get all of the food recipes. 
<br>
https://spoonacular.com/food-api/docs#Search-Recipes-Complex
<br>
<br>
https://www.figma.com/file/hb8l5O8BgZ19PRO5crCJdR/StyleTile?type=design&mode=design&t=8dAt6nr8mWerv0hW-1
