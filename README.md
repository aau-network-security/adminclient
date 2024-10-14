# HAAUKINS admin client
This is an introduction for the admin client made for managing HAAUKINS 2.0. 
The guide will give an introduction to the main functionalities and use of the admin panel and describe the different user roles and their permissions.
The admin panel is mainly used by the superadmins managing the HAAUKINS infrastructure, teachers and HAAUKINS challenge developers. 

## Organizations
This page is for managing permissions, users and more. For an overview of different permissions see [Overview of permissions](###Overview-of-permissions). 
There are 5 roles on the page: 

- **SuperAdmin**  
These have the highest amount of privileges. This type of user is for configuring and managing the platform. They have privileges for managing all events, they can see all challenges both secret and more. 
Furthermore they are the only ones who are able to create new organizations. They can edit all users and more. 

- **Administrator**  
  Administrators have access to managing the organization they belong to. Furthermore they can access secret challenges, create a new user start new events and more. Only users involved in planning competitions, challenge development should have administrator access.  

- **Developer**  
The developer role is mainly used for developers developing challenges for HAAUKINS. Only users involved in planning competitions, challenge development should have developer access. 

- **User**  
The user role is ideal for teachers the like who needs access to the platform for teaching students.

- **npUser**  
A user that can only create events, view challenges and view profiles


### Overview of permissions: 
This is an overview of the permissions of different roles available on the admin panel for HAAUKINS. 
 
| Functionality/User Role               | Super Administrator | Administrator | Developer | npUser | User |
| ------------------------------------- | ------------------- | ------------- | --------- | ------ | ---- |
| Create Events                         | Yes                 | Yes           | Yes       | Yes    | Yes  |
| Create Profiles                       | Yes                 | Yes           | Yes       | No     | Yes  |
| View Profiles                         | Yes                 | Yes           | Yes       | Yes    | Yes  |
| Manage events of all orgs and users   | Yes                 | No            | No        | No     | No   |
| Manage organizations                  | Yes                 | No            | No        | No     | no   |
| Manage users of all organizations     | Yes                 | No            | No        | No     | No   |
| Manage users in assigned organization | Yes                 | Yes           | No        | No     | No   |
| View users in assigned organization   | Yes                 | Yes           | No        | No     | No   |
| Manage own user                       | Yes                 | Yes           | No        | No     | No   |
| View secret challenges                | Yes                 | Yes           | Yes       | No     | No   |
| Access to agents management           | Yes                 | No            | No        | No     | No   |

## Agents 
The agents are the main engines responsible for running labs for events on HAAUKINS. The Super Administrators can manage these under the agents page. 
To add a new Agent to the cluster do the following: 
1. Click on add new agent.
2. Give it a meaningfull name 
3. Give it a weight 
4. Add the url address of the new agent. 
5. Add the signkey of the new agent. 
6. Add the authkey of the new agent. 

## Challenges and profiles
On this page it is possible to view challenges and their descriptions. Furthermore, it is possible to create profiles with sets of challenges and add a description to the profile with learning goals etc. Profiles can be either private or public. Public meaning that everyone can view and edit the profile. Private meaning that only the user responsible for creating the profile is able to see and edit the profile. 

## Events page
This page you can see currently running or previous events that have finished. It is possible to stop a running event as well. Furthermore it is possible to create new events. 

### Creating a new event 
When creating a new event the first thing you will need to consider is wether the event needs to be advanced or simple. 
For most purposes a simple event will do just fine, but for events where more than 20 challenges have been selected an advanced event is more suitable. 
The main difference is that for advanced events more functionalities are provided: 

**Advanced events has the following functionalities:**
- Starting and stopping challenges
- Possibility of choosing between using VPN or the provided Virtual Kali machine.
- In advanced events users can activate up to 5 challenges. After activating 5 challenges one have to be stopped in order to start a new one. This has been done in order to preserve resources to accommodate heavy loads for larger CTF events. 
- The advanced events are as a rule of thumb mainly for the more experienced users. 


## FAQ
In this section you can find answers to frequently asked questions.  
**I forgot my password!?**  
If you forgot your password you will need to contact your administrator then they can reset it for you. 

**Why do you need my Email:**  
We need emails of all users using the admin panel in order to inform in case of service issues or other issues with the platform. 


## Deployment

The Haaukins admin frontend is used for managing the Haaukins 2.0 platform as well as creating events, managing admin users, organisations as well as managing challenges pages. Furthermore an overview over the different agents and other performance metrics for the platform are accessible on the admin frontend.

**The following steps are nessecary in order to deploy the admin client.Note that NGINX config setup can vary depending on your setup:**    
1. Add NGINX configs to nginx sites available and link to sites enabled.   
2. Make sure the correct domain name is used in `/src/api/client.js` i.e:  

```javascript 
import axios from "axios";

export const BASE_URL = "https://beta.haaukins.com/v1/admin/"

const apiClient = axios.create({
  // Later read this URL from an environment variable
  baseURL: "https://beta.haaukins.com/v1/admin"
});

export default apiClient;
```
4. Build and start the frontend with the following command: `npm build`  

5. The nginx proxy for the frontend server looks like the following:  
```conf
upstream admin_server {
  keepalive 100;
  keepalive_requests 1000;
  keepalive_timeout 60s;
  server localhost:3001;
}

server {
  #server_name ~^(?<event>\w+)\.a\.haaukins\.com$;
  server_name admin.domainname.com;
  # limit_req zone=mylimit burst=15;
  #Set limit to 10 after test
  #limit_conn addr 500;
  #limit_req_status 429;
  client_max_body_size 100M;
  location / {
    proxy_pass http://admin_server;
    proxy_buffering off;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }


  listen 443 ssl; # managed by Certbot
  ssl_certificate /home/haaukins/daemon/certs/fullchain.pem; # managed by Certbot
  ssl_certificate_key /home/haaukins/daemon/certs/privkey.pem; # managed by Certbot
}

#Uncomment if ssl is used
server {
  server_name admin.domainname.com;
  listen 80;
  return 301 https://$host$request_uri;
}

```