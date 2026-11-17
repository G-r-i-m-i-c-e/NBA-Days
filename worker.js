// Cloudflare Worker: serves static assets through Workers Assets and proxies only three NBA endpoints.
const NBA='https://cdn.nba.com/static/json/';
export default {async fetch(request,env){let u=new URL(request.url);if(!u.pathname.startsWith('/api/'))return env.ASSETS.fetch(request);
let path=u.pathname;let target;
if(path==='/api/schedule')target=NBA+'staticData/scheduleLeagueV2.json';
else if(path==='/api/today')target=NBA+'liveData/scoreboard/todaysScoreboard_00.json';
else if(/^\/api\/boxscore\/\d{10}$/.test(path))target=NBA+'liveData/boxscore/boxscore_'+path.split('/').pop()+'.json';
else return new Response('Not found',{status:404});
try{let response=await fetch(target,{headers:{Accept:'application/json'},cf:{cacheTtl:path==='/api/schedule'?3600:20,cacheEverything:true}});if(!response.ok)return new Response('NBA upstream '+response.status,{status:502});return new Response(response.body,{status:200,headers:{'content-type':'application/json; charset=utf-8','cache-control':path==='/api/schedule'?'public,max-age=900':'public,max-age=20'}})}catch(e){return new Response('NBA upstream unavailable',{status:503})}}
};
