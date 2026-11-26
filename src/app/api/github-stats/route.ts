import { NextResponse } from "next/server";
const ROOT="https://api.github.com";
export const revalidate=900;
type Profile={public_repos:number;followers:number;following:number};
type Repo={name:string;html_url:string;language:string|null;stargazers_count:number;forks_count:number;description:string|null;updated_at:string;fork:boolean};
export async function GET(){
  try {
    const headers={Accept:"application/vnd.github+json","User-Agent":"Tuyen-Doan-Portfolio","X-GitHub-Api-Version":"2022-11-28"};
    const [profileResponse,reposResponse]=await Promise.all([
      fetch(ROOT+"/users/Tdoan031024",{headers,next:{revalidate:900},signal:AbortSignal.timeout(8000)}),
      fetch(ROOT+"/users/Tdoan031024/repos?sort=updated&per_page=20&type=owner",{headers,next:{revalidate:900},signal:AbortSignal.timeout(8000)})
    ]);
    if(!profileResponse.ok||!reposResponse.ok)throw new Error("GitHub unavailable");
    const profile=await profileResponse.json() as Profile;
    const repos=await reposResponse.json() as Repo[];
    if(!Array.isArray(repos)||typeof profile.public_repos!=="number")throw new Error("Invalid GitHub data");
    return NextResponse.json({public_repos:profile.public_repos,followers:profile.followers,following:profile.following,repos:repos.filter(r=>!r.fork).slice(0,8).map(r=>({name:r.name,html_url:r.html_url,language:r.language,stargazers_count:r.stargazers_count,forks_count:r.forks_count,description:r.description,updated_at:r.updated_at}))},{headers:{"Cache-Control":"public, s-maxage=900, stale-while-revalidate=1800"}});
  }catch{return NextResponse.json({error:"GitHub temporarily unavailable"},{status:503,headers:{"Cache-Control":"no-store"}});}
}
