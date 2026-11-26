import {NextRequest,NextResponse} from "next/server";
import {getCloudflareContext} from "@opennextjs/cloudflare";
export const dynamic="force-dynamic";
const headers={"Cache-Control":"no-store"};
export async function GET(){
 try{
  const {env}=await getCloudflareContext({async:true});
  if(!env.DB)throw Error("No DB");
  const data=await env.DB.prepare("SELECT country, visits FROM universe_country_checkins ORDER BY visits DESC LIMIT 250").all<{country:string;visits:number}>();
  return NextResponse.json({countries:data.results},{headers});
 }catch{return NextResponse.json({error:"Visitor stats unavailable"},{status:503,headers});}
}
export async function POST(request:NextRequest){
 try{
  const origin=request.headers.get("origin");
  if(origin!==request.nextUrl.origin)return NextResponse.json({error:"Forbidden"},{status:403,headers});
  if(request.cookies.get("universe_country_checkin")?.value==="1")return NextResponse.json({ok:true},{headers});
  const data=await request.json() as {consent?:boolean};
  if(data.consent!==true)return NextResponse.json({error:"Consent required"},{status:400,headers});
  const country=request.headers.get("cf-ipcountry")?.toUpperCase();
  if(!country||! /^[A-Z]{2}$/.test(country)||country==="XX")return NextResponse.json({error:"Country unavailable"},{status:503,headers});
  const {env}=await getCloudflareContext({async:true});
  if(!env.DB)throw Error("No DB");
  await env.DB.prepare("INSERT INTO universe_country_checkins(country,visits) VALUES (?,1) ON CONFLICT(country) DO UPDATE SET visits=visits+1").bind(country).run();
  const response=NextResponse.json({ok:true},{headers});
  response.cookies.set("universe_country_checkin","1",{httpOnly:true,sameSite:"lax",secure:request.nextUrl.protocol==="https:",maxAge:86400,path:"/"});
  return response;
 }catch{return NextResponse.json({error:"Visitor stats unavailable"},{status:503,headers});}
}
