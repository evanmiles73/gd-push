"use client";
import {useMemo,useState} from "react";
const brands=["旅人日和","小拾光接送","迷旅台灣","拾光漫遊－假日旅行"];
const platforms=["Facebook","Instagram","Threads","小紅書"];
const seed={Facebook:"溫暖實用",Instagram:"短句＋Hashtag",Threads:"聊天互動",小紅書:"生活感種草"};
export default function Home(){
 const[brand,setBrand]=useState(brands[0]),[topic,setTopic]=useState(""),[tab,setTab]=useState("home");
 const[selected,setSelected]=useState(platforms),[drafts,setDrafts]=useState([]);
 const toggle=x=>setSelected(v=>v.includes(x)?v.filter(i=>i!==x):[...v,x]);
 const create=()=>{if(!topic.trim())return;setDrafts(selected.map((p,i)=>({id:Date.now()+i,platform:p,brand,topic:topic.trim(),style:seed[p],status:"待確認"})));setTab("drafts")};
 const title=useMemo(()=>({drafts:"待發布",schedule:"排程中心",media:"素材庫",stats:"成效分析",settings:"設定"}[tab]||""),[tab]);
 return <main><header><div><b>GD PUSH</b><small>AI 社群推廣助手</small></div><span>🌼</span></header>
 <section className="brand"><label>目前品牌</label><select value={brand} onChange={e=>setBrand(e.target.value)}>{brands.map(x=><option key={x}>{x}</option>)}</select></section>
 {tab==="home"?<><section className="hero"><div className="meg">📣</div><h1>今天想推什麼？</h1><p>先選平台、輸入主題，再建立待發布內容。</p><textarea value={topic} onChange={e=>setTopic(e.target.value)} placeholder="例如：這週主推台中 → 桃園機場接送"/>
 <div className="chips">{platforms.map(x=><button className={selected.includes(x)?"on":""} onClick={()=>toggle(x)} key={x}>{selected.includes(x)?"✓ ":""}{x}</button>)}</div>
 <button className="primary" disabled={!topic.trim()||!selected.length} onClick={create}>✨ 建立推廣草稿</button></section>
 <section className="grid"><button onClick={()=>setTab("drafts")}>📝<b>待發布</b><small>{drafts.length} 則草稿</small></button><button onClick={()=>setTab("schedule")}>📅<b>排程中心</b><small>安排發布時間</small></button><button onClick={()=>setTab("media")}>🖼️<b>素材庫</b><small>圖片與內容</small></button><button onClick={()=>setTab("stats")}>📊<b>成效分析</b><small>追蹤推廣結果</small></button></section></>:
 <section className="panel"><button className="back" onClick={()=>setTab("home")}>‹ 返回首頁</button><div className="big">🌼</div><h2>{title}</h2>
 {tab==="drafts"?(drafts.length?drafts.map(d=><article key={d.id}><div className="row"><b>{d.platform}</b><em>{d.status}</em></div><span>{d.brand}・{d.style}</span><p>{d.topic}</p><div className="actions"><button onClick={()=>setTopic(d.topic)}>編輯主題</button><button onClick={()=>setDrafts(v=>v.filter(x=>x.id!==d.id))}>刪除</button></div></article>):<p className="empty">目前沒有草稿，回首頁建立第一則。</p>):<p className="empty">功能入口已建立，下一階段再接實際服務。</p>}
 </section>}
 <nav><button onClick={()=>setTab("home")}>🏠<span>首頁</span></button><button onClick={()=>setTab("drafts")}>✍️<span>內容</span></button><button onClick={()=>setTab("schedule")}>📅<span>排程</span></button><button onClick={()=>setTab("stats")}>📈<span>成效</span></button><button onClick={()=>setTab("settings")}>⚙️<span>設定</span></button></nav></main>
}