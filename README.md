# Babyancestry
When running the app locally, make sure to uncomment the dev settings in accounts/static/app/js/service.js.
` python manage.py runserver `

## Directories
- **Accounts** - This directory houses the main app. Django serves the files in the backend, while Angularjs works on the front end by using the Familysearch Javascript SDK. 
- **Config** - This is the main django app containg settings, main urlsconf, etc. 

## Sources
- [Familysearch Javascript SDK Github](https://github.com/FamilySearch/familysearch-javascript-sdk)
- [Slides from RootsTech 2014](http://dallanq.github.io/rootstech-2014-fs-js-sdk-slides/#/)
