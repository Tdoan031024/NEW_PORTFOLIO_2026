"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { projects } from "@/data/projects";
import { useLanguage } from "@/components/LanguageProvider";
import styles from "./UniverseLab.module.css";
import UniverseExtras from "./UniverseExtras";
import { award } from "./universeState";

type Tab = "galaxy" | "terminal" | "github" | "assistant" | "tour" | "search" | "room" | "achievements" | "visitors" | "recruiter";
type Repo = { name: string; html_url: string; language: string | null; stargazers_count: number; forks_count: number; description: string | null; updated_at: string };
type Stats = { public_repos: number; followers: number; following: number; repos: Repo[] };
const tabs: {id: Tab; label: string; vi: string; icon: string}[] = [
  {id:"galaxy",label:"Galaxy",vi:"Ngân hà",icon:"◉"},
  {id:"terminal",label:"Terminal",vi:"Terminal",icon:"›_"},
  {id:"github",label:"GitHub",vi:"GitHub",icon:"⌘"},
  {id:"assistant",label:"Digital Twin",vi:"Trợ lý",icon:"✧"},
  {id:"tour",label:"Cinematic",vi:"Tham quan",icon:"▷"},
  {id:"search",label:"Search",vi:"Tìm kiếm",icon:"⌕"},
  {id:"room",label:"Room & sound",vi:"Phòng & âm thanh",icon:"☾"},
  {id:"achievements",label:"Achievements",vi:"Thành tích",icon:"✦"},
  {id:"visitors",label:"Visitor globe",vi:"Khách truy cập",icon:"◎"},
  {id:"recruiter",label:"Recruiter",vi:"Tuyển dụng",icon:"▤"}
];
const colors = ["#e879f9","#60a5fa","#34d399","#fb923c","#a78bfa","#f472b6","#22d3ee","#fbbf24"];
const stops = [
  {id:"intro-3d",en:"3D workspace",vi:"Phòng IT 3D"},
  {id:"hero",en:"About me",vi:"Giới thiệu"},
  {id:"skills",en:"Technical skills",vi:"Kỹ năng"},
  {id:"experience",en:"Experience",vi:"Kinh nghiệm"},
  {id:"projects",en:"Featured projects",vi:"Dự án"},
  {id:"contact",en:"Contact",vi:"Liên hệ"}
];
function normalize(s:string){return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/đ/g,"d");}
function reply(input:string, vi:boolean){
 const q=normalize(input);
 const match=projects.find(p=>normalize(p.slug.replace(/-/g," ")).split(" ").filter(w=>w.length>3).some(w=>q.includes(w)));
 if(match)return match.title+"\n"+match.description+"\n"+match.techs.join(" · ");
 if(/skill|stack|ky nang|cong nghe|technolog/.test(q))return "React · Next.js · TypeScript · Node.js · NestJS · React Native · MySQL · Three.js · Docker";
 if(/contact|hire|interview|lien he|tuyen dung|phong van/.test(q))return vi?"Hãy dùng mục Liên hệ hoặc tải CV trên portfolio.":"Use the Contact section or download the CV from the portfolio.";
 if(/experience|kinh nghiem|work|job/.test(q))return vi?"Full-stack Engineer tại Cluega; Full-stack Developer tại SOF; thực tập tại IEC – HUIT. Xem mục Kinh nghiệm để biết chi tiết.":"Full-stack Engineer at Cluega; Full-stack Developer at SOF; internship at IEC – HUIT. See Experience for details.";
 if(/project|du an/.test(q))return projects.map(p=>p.title).join("\n");
 if(/about|who|gioi thieu|ban la ai/.test(q))return vi?"Tuyến Đoàn là Full-stack Software Engineer, xây dựng ứng dụng web, mobile và trải nghiệm 3D.":"Tuyen Doan is a full-stack software engineer building web, mobile and interactive 3D experiences.";
 return vi?"Mình là trợ lý dựa trên dữ liệu portfolio, chưa kết nối mô hình AI. Hãy hỏi về dự án, kỹ năng, kinh nghiệm hoặc liên hệ.":"I am a portfolio knowledge assistant, not a connected language model. Ask about projects, skills, experience or contact.";
}

export default function UniverseLab({onClose,initialTab="galaxy"}:{onClose:()=>void;initialTab?:"galaxy"|"search"|"achievements"}){
 const {language}=useLanguage(); const vi=language==="vi";
 const [tab,setTab]=useState<Tab>(initialTab);
 const [selected,setSelected]=useState(0);
 const [cmd,setCmd]=useState("");
 const [lines,setLines]=useState<string[]>(["Universe shell v1.0 — type help"]);
 const [stats,setStats]=useState<Stats|null>(null);
 const [status,setStatus]=useState<"idle"|"loading"|"error"|"ready">("idle");
 const [retry,setRetry]=useState(0);
 const [question,setQuestion]=useState("");
 const [aiEnabled,setAiEnabled]=useState(false);
 const [aiBusy,setAiBusy]=useState(false);
 const [aiNotice,setAiNotice]=useState("");
 const aiAbort=useRef<AbortController|null>(null);
 const [query,setQuery]=useState("");
 const [chat,setChat]=useState<{q:string;a:string}[]>([]);
 const [tour,setTour]=useState(-1);
 const [playing,setPlaying]=useState(false);
 const dialog=useRef<HTMLDialogElement>(null);
 const scrollRef=useRef<HTMLDivElement>(null);
 const tourTimer=useRef<number|null>(null);
 
 useEffect(()=>{
   const el=dialog.current;
   if(el&&!el.open)el.showModal();
   return ()=>{if(el?.open)el.close();window.speechSynthesis?.cancel();aiAbort.current?.abort();};
 },[]);
 useEffect(()=>{
   if(tab!=="github"||stats)return;
   const controller=new AbortController();
   setStatus("loading");
   fetch("/api/github-stats",{signal:controller.signal}).then(async r=>{if(!r.ok)throw Error("unavailable");return await r.json() as Stats;}).then(data=>{setStats(data);setStatus("ready")}).catch(()=>{if(!controller.signal.aborted)setStatus("error")});
   return ()=>controller.abort();
 },[tab,retry,stats]);
 useEffect(()=>{if(scrollRef.current)scrollRef.current.scrollTop=scrollRef.current.scrollHeight;},[lines,chat]);
 useEffect(()=>{
   if(tour<0)return;
   const el=dialog.current;
   if(el?.open)el.close();
   document.getElementById(stops[tour].id)?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"start"});
 },[tour]);
 useEffect(()=>{
   if(!playing||tour<0)return;
   tourTimer.current=window.setTimeout(()=>{
      if(tour===stops.length-1){setPlaying(false);return;}
      setTour(tour+1);
   },5500);
   return ()=>{if(tourTimer.current!==null)window.clearTimeout(tourTimer.current);};
 },[playing,tour]);
 const endTour=()=>{setPlaying(false);setTour(-1);dialog.current?.showModal();};
 useEffect(()=>{
   if(tour<0)return;
   const key=(e:KeyboardEvent)=>{if(e.key==="Escape"){setPlaying(false);setTour(-1);dialog.current?.showModal();}};
   window.addEventListener("keydown",key);return ()=>window.removeEventListener("keydown",key);
 },[tour]);
 const go=(id:string)=>{if(dialog.current?.open)dialog.current.close();onClose();requestAnimationFrame(()=>document.getElementById(id)?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"}));};
 const run=(event:FormEvent)=>{event.preventDefault();const c=cmd.trim();setCmd("");if(!c)return;award("terminal");const k=normalize(c);
 if(k==="clear"){setLines([]);return;}
 if(k==="help"){setLines(a=>[...a,"$ "+c,"help · about · skills · projects · contact · github · galaxy · tour · search · room · achievements · visitors · recruiter · clear"].slice(-80));return;}
 if(k==="github"||k==="galaxy"||k==="tour"||k==="search"||k==="room"||k==="achievements"||k==="visitors"||k==="recruiter"){setTab(k);return;}
 if(k==="42"||k==="sudo universe"){award("secret");setLines(a=>[...a,"$ "+c,"✦ Secret signal decoded. Check achievements."].slice(-80));return;}
 const destinations:Record<string,string>={about:"hero",skills:"skills",projects:"projects",contact:"contact"};
 if(Object.prototype.hasOwnProperty.call(destinations,k)){go(destinations[k]);return;}
 setLines(a=>[...a,"$ "+c,vi?"Không tìm thấy lệnh. Gõ help.":"Unknown command. Type help."].slice(-80));
 };
 const ask=async(q:string)=>{
   const value=q.trim().slice(0,500);if(!value||aiBusy)return;
   setQuestion("");award("assistant");setAiNotice("");
   let answer=reply(value,vi);
   if(aiEnabled){
     setAiBusy(true);
     const controller=new AbortController();aiAbort.current=controller;
     try{
       const response=await fetch("/api/universe-assistant",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:value,language:vi?"vi":"en"}),signal:controller.signal});
       if(!response.ok)throw Error("unavailable");
       const data=await response.json() as {answer?:string};
       if(!data.answer)throw Error("empty");
       answer=data.answer;
     }catch{if(controller.signal.aborted)return;setAiNotice(vi?"AI chưa khả dụng; đang dùng dữ liệu portfolio.":"AI unavailable; using local portfolio data.");}
     finally{if(!controller.signal.aborted)setAiBusy(false);}
   }
   setChat(a=>[...a,{q:value,a:answer}].slice(-15));
 };
 const speak=(text:string)=>{if(!("speechSynthesis" in window))return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=vi?"vi-VN":"en-US";window.speechSynthesis.speak(u);};
 const p=projects[selected];
 const searchResults=[...stops.map(s=>({label:vi?s.vi:s.en,action:()=>go(s.id),key:s.id})),...tabs.filter(t=>t.id!=="search").map(t=>({label:vi?t.vi:t.label,action:()=>setTab(t.id),key:t.id})),...projects.map((p,i)=>({label:p.title,action:()=>{setSelected(i);setTab("galaxy");award("galaxy");},key:p.slug}))].filter(r=>normalize(r.label).includes(normalize(query))).slice(0,25);
 return <>
 <dialog ref={dialog} className={styles.dialog} aria-labelledby="universe-title" onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}>
 <div className={styles.panel}>
 <header className={styles.header}><div><small>INTERACTIVE EXPERIENCE / 2026</small><h2 id="universe-title">Universe Lab</h2></div><button type="button" onClick={onClose} aria-label={vi?"Đóng":"Close"}>×</button></header>
 <nav className={styles.tabs} aria-label="Universe Lab">{tabs.map(t=><button key={t.id} type="button" aria-pressed={tab===t.id} onClick={()=>{window.speechSynthesis?.cancel();setTab(t.id)}}><span>{t.icon}</span> {vi?t.vi:t.label}</button>)}</nav>
 <div className={styles.content}>
 {tab==="galaxy"&&<><p className={styles.muted}>{vi?"Chọn một hành tinh để khám phá dự án.":"Select a planet to explore a project."}</p><div className={styles.galaxy} aria-label="Project galaxy"><div className={styles.sun}>✦</div>{projects.map((item,i)=>{const angle=i*Math.PI*2/projects.length-Math.PI/2;return <button key={item.slug} type="button" className={styles.planet} aria-label={item.title} aria-pressed={selected===i} onClick={()=>{setSelected(i);award("galaxy");}} style={{left:(50+37*Math.cos(angle))+"%",top:(50+35*Math.sin(angle))+"%",background:"radial-gradient(circle at 28% 24%,#fff,"+colors[i%colors.length]+" 32%,#10182c 95%)",boxShadow:"0 0 "+(selected===i?30:12)+"px "+colors[i%colors.length]}}><span>{item.number}</span></button>})}</div><div className={styles.details}><small>{p.year} / {p.role}</small><h3>{p.title}</h3><p>{p.description}</p><div className={styles.chips}>{p.techs.map(t=><span key={t}>{t}</span>)}</div><div className={styles.links}>{p.liveUrl&&<a href={p.liveUrl} target="_blank" rel="noopener noreferrer">Live demo ↗</a>}{p.githubUrl&&<a href={p.githubUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a>}<button onClick={()=>go("projects")}>{vi?"Xem tất cả":"All projects"} →</button></div></div></>}
 {tab==="terminal"&&<div className={styles.terminal}><div ref={scrollRef} className={styles.output} role="log">{lines.map((line,i)=><div key={i}>{line}</div>)}</div><form onSubmit={run} className={styles.form}><label htmlFor="lab-command">$</label><input id="lab-command" autoComplete="off" value={cmd} onChange={e=>setCmd(e.target.value)} placeholder="help" maxLength={100}/><button>Run</button></form></div>}
 {tab==="github"&&<><p className={styles.muted}>{vi?"Dữ liệu công khai từ GitHub, cache 15 phút.":"Public GitHub data, cached for 15 minutes."}</p>{status==="loading"&&<p role="status">Loading GitHub…</p>}{status==="error"&&<div role="alert"><p>{vi?"Không tải được dữ liệu GitHub.":"GitHub data unavailable."}</p><button onClick={()=>setRetry(v=>v+1)}>Retry</button></div>}{stats&&<><div className={styles.metrics}>{[[stats.public_repos,"Repositories"],[stats.followers,"Followers"],[stats.following,"Following"]].map(([n,label])=><div key={label}><strong>{n}</strong><small>{label}</small></div>)}</div><div className={styles.repoList}>{stats.repos.map(r=><a key={r.name} href={r.html_url} target="_blank" rel="noopener noreferrer"><strong>{r.name} ↗</strong><p>{r.description||r.language||"Repository"}</p><small>{r.language||"—"} · ★ {r.stargazers_count} · Forks {r.forks_count}</small></a>)}</div></>}<a href="https://github.com/Tdoan031024" target="_blank" rel="noopener noreferrer">GitHub profile ↗</a></>}
 {tab==="assistant"&&<><div className={styles.assistant}><div className={styles.orb}>✧</div><div><h3>Doan Digital Twin</h3><p className={styles.muted}>{vi?"Dữ liệu portfolio · AI tùy chọn":"Portfolio knowledge · optional AI"}</p></div></div><div className={styles.chips}>{(vi?["Kinh nghiệm","Dự án","Kỹ năng","Liên hệ"]:["Experience","Projects","Skills","Contact"]).map(q=><button key={q} onClick={()=>ask(q)}>{q}</button>)}</div><label className={styles.muted}><input type="checkbox" checked={aiEnabled} onChange={e=>setAiEnabled(e.target.checked)} disabled={aiBusy}/> {vi?"Dùng AI đám mây (gửi câu hỏi đến dịch vụ AI)":"Use cloud AI (sends your question to an AI service)"}</label>{aiNotice&&<p role="status" className={styles.muted}>{aiNotice}</p>}{aiBusy&&<p role="status">AI…</p>}<div className={styles.chat} ref={scrollRef} role="log">{chat.map((c,i)=><div key={i}><strong>{c.q}</strong><p>{c.a}</p><button onClick={()=>speak(c.a)}>{vi?"Đọc câu trả lời":"Read aloud"}</button></div>)}</div><form className={styles.form} onSubmit={e=>{e.preventDefault();ask(question)}}><input aria-label={vi?"Câu hỏi":"Question"} value={question} onChange={e=>setQuestion(e.target.value)} maxLength={500} placeholder={vi?"Hỏi về portfolio…":"Ask about the portfolio…"}/><button disabled={aiBusy}>Send</button></form><div className={styles.links}><button onClick={()=>window.speechSynthesis?.cancel()}>{vi?"Dừng giọng nói":"Stop speech"}</button><button onClick={()=>{onClose();window.dispatchEvent(new CustomEvent("open-ai-chat-modal"))}}>{vi?"Mở robot 3D":"Open 3D robot"}</button></div></>}
 {tab==="tour"&&<div className={styles.details}><div className={styles.orb}>▷</div><h3>{vi?"Hành trình qua vũ trụ":"Cinematic journey"}</h3><p>{vi?"Tham quan 6 khu vực, mỗi điểm dừng 5,5 giây. Có thể tạm dừng, chuyển bước hoặc thoát bất cứ lúc nào.":"Tour six sections with 5.5-second stops. Pause, navigate or exit anytime."}</p><div className={styles.chips}>{stops.map(s=><span key={s.id}>{vi?s.vi:s.en}</span>)}</div><button onClick={()=>{award("tour");setTour(0);setPlaying(true)}}>{vi?"Bắt đầu hành trình":"Start journey"} →</button></div>}
 {tab==="search"&&<><div className={styles.form}><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder={vi?"Tìm dự án, kỹ năng, tính năng…":"Search projects, skills, features…"} aria-label={vi?"Tìm kiếm":"Search"} onKeyDown={e=>{if(e.key==="Enter")searchResults[0]?.action();}}/></div><div className={styles.searchList}>{searchResults.map(r=><button key={r.key} onClick={r.action}>{r.label}<span>↗</span></button>)}{!searchResults.length&&<p>{vi?"Không có kết quả":"No results"}</p>}</div></>}
 {(["room","achievements","visitors","recruiter"] as Tab[]).includes(tab)&&<UniverseExtras tab={tab as "room"|"achievements"|"visitors"|"recruiter"} vi={vi} go={go} onClose={onClose}/>}
 </div></div></dialog>
 {tour>=0&&<div className={styles.tour} role="region" aria-label="Cinematic tour"><small>{tour+1}/{stops.length}</small><strong>{vi?stops[tour].vi:stops[tour].en}</strong><button disabled={tour===0} onClick={()=>setTour(v=>Math.max(0,v-1))}>‹</button><button onClick={()=>setPlaying(v=>!v)}>{playing?"Ⅱ":"▷"}</button><button disabled={tour===stops.length-1} onClick={()=>setTour(v=>Math.min(stops.length-1,v+1))}>›</button><button onClick={endTour}>×</button></div>}
 </>;
}
