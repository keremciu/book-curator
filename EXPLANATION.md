# Explanation:

#### What I used?

- create-react-app
- styled-components
- material-ui
- react-router-dom

#### First I'd like to say, I used this project as an opportunity to try new things. Most of the ideas I explained below already says I don't follow many ideas I put inside this project but it's nice to see what I will gonna learn in the end.

I really liked this example of using React context as authentication provider. I implemented the solution and make it clean for this project.

https://medium.com/trabe/how-we-handle-react-context-e43d303a27a2

I created a folder called `setup` to put app-wide configurable files.

I really liked the idea of putting sub-applications and you can see examples of using them inside my other GitHub repositories but in this project, I wanted to see what's changed in the other ways of strucruting UI logic. I'm always talking about this is an anti-pattern for scalable JS applications but refreshing last sample in my brain is always an interesting thing. I will still gonna try to make some contraints like don't put any dependency from any horizontal peer. (wow, what a talk! it's me when I'm trying new things 🤦‍♂️)

I didn't put Redux or any other state management tool for Data layer. I just wanted to see that I can build these pages without separated data part other than authentication context.

For me, the main deal about this challenge is solving two different data points in your data layer. I didn't use state management solution but if I used something like Redux I could make an util to put memoize stuff inside it and don't make the same arragegation many times.

## IDEAS

handle page reloads: I think the main idea would be putting suspense and lazy functionalities from React and there is a chance to put transitions with react router dom. Every page could expose their own data fetch request in a separate file like "bookFragment" then we can easily solve the page with their fragment promise. There's no input right now but maybe in the future it would be nice to keep the data of inputs from the users on localstorage or cookies before sending API to don't lose them.

adding checkout flows: It would be nice to put subscription funnel. It could start right after CTA button and shows how beneficial to subscribe to the system. I think it's marketing stuff but it would be nice to give some 30 days refund thing with nice UX and encourage them to subscribe without fear.

search: The best should be something like genaral search. It can search category or book, or maybe FAQ answers? It would be nice to show results in an autocomplete with categorized names.

audio player: how about trying the simple audio solution? It's like putting your audio component into app level then no router change or data change would not disturb audio player, if it's necessary to put inside in a deeper level than app level then it can live inside in a Portal to take out dependency refresh problem.
