const $ = (selector) => document.querySelector(selector);
const story = $('#story');
const match = $('#match');
const result = $('#result');
const host = $('#scene-host');
const skillCard = $('#skill-card');

const ui = {
  en: {
    navStory:'Story', navWork:'Work', navSkills:'Skill match', navContact:'Contact', contactHint:'Ready to talk? Message me on Telegram.', motion:'Motion', scrollHint:'SCROLL TO EXPLORE', matchScrollHint:'SCROLL ON TO SKILL MATCH',
    matchKicker:'THE SKILL MATCH', matchHeading:'What does your team need?', lessRelevant:'Less relevant', needThis:'Need this', undo:'Undo', deckTip:'Swipe the card or use the buttons. Your choices stay in this browser.',
    resultKicker:'THE CONNECTION', resultEvidence:'See the work behind the match', resultClosingTitle:'I’m ready to discuss your role.', resultClosingBody:'If your stack includes something I haven’t used yet, I’ll be direct about the gap, learn it quickly and validate it in practice. Let’s talk about what your team needs.', telegramCta:'Let’s talk on Telegram', restart:'Start again', footer:'Built around the work. Designed for a conversation.',youNeed:'YOUR PRIORITIES',iBring:'WHAT I BRING',
    learned:'LEARNED', used:'USED', proof:'EXPLORE PROJECT', privateProof:'PRIVATE WORK / CV', selected:'Shortlist in progress', resultIntro:(n)=>n?'The capabilities you chose connect directly to work I have done. Here is the overlap, with projects you can inspect.':'No specific capabilities selected yet. Here is a quick view of my work; I would be glad to discuss what your team actually needs.',
    bridge:(picked)=>picked.length?`I have used ${picked.slice(0,3).map(item=>item.title).join(', ')}${picked.length>3?' and related skills':''} across backend, automation and Applied AI work.`:'Backend engineering, AI automation and practical product delivery.',
    noSelection:'Open to discussing your priorities', projectLink:'View project'
  },
  ru: {
    navStory:'История', navWork:'Проекты', navSkills:'Совпадение', navContact:'Связаться', contactHint:'Готовы обсудить задачи? Напишите мне в Telegram.', motion:'Анимация', scrollHint:'ЛИСТАЙТЕ ДАЛЬШЕ', matchScrollHint:'ЛИСТАЙТЕ К ПОДБОРУ НАВЫКОВ',
    matchKicker:'ПОДБОР НАВЫКОВ', matchHeading:'Что нужно вашей команде?', lessRelevant:'Менее важно', needThis:'Нужно', undo:'Отменить', deckTip:'Смахните карточку или используйте кнопки. Выбор остаётся в вашем браузере.',
    resultKicker:'ТОЧКА СОВПАДЕНИЯ', resultEvidence:'Проекты за этим совпадением', resultClosingTitle:'Готов рассмотреть ваше предложение.', resultClosingBody:'Если в вашем стеке есть то, с чем я ещё не работал, честно обозначу пробел, быстро изучу новую часть и проверю её на практике. Давайте обсудим задачи команды.', telegramCta:'Обсудить в Telegram', restart:'Начать заново', footer:'Основано на работе. Создано для диалога.',youNeed:'ВАШИ ПРИОРИТЕТЫ',iBring:'МОЙ ОПЫТ',
    learned:'ИЗУЧИЛ', used:'ПРИМЕНИЛ', proof:'ОТКРЫТЬ ПРОЕКТ', privateProof:'ЗАКРЫТЫЙ ПРОЕКТ / CV', selected:'Список формируется', resultIntro:(n)=>n?'Выбранные вами навыки связаны с задачами, которые я уже решал. Ниже — конкретные проекты, которые можно посмотреть.':'Пока вы не отметили конкретные навыки. Ниже — короткий обзор моей работы; буду рад обсудить реальные задачи команды.',
    bridge:(picked)=>picked.length?`Я применял ${picked.slice(0,3).map(item=>item.title).join(', ')}${picked.length>3?' и смежные навыки':''} в backend, автоматизации и Applied AI проектах.`:'Backend-разработка, AI-автоматизация и доведение продуктов до результата.',
    noSelection:'Открыт к обсуждению задач', projectLink:'Открыть проект'
  }
};

const scenes = [
  {
    theme:'coral', label:{en:'THE INTRODUCTION',ru:'ЗНАКОМСТВО'},
    title:{en:'Hi, I’m<br><em>Nikolay</em><br>Kapelushniy<span class="accent-period">.</span>',ru:'Привет, я<br><em>Николай</em><br>Капелюшный<span class="accent-period">.</span>'},
    preface:{en:'A portfolio you can actually explore.',ru:'Портфолио, которое можно исследовать.'},
    role:{en:'Applied AI Engineer · 7+ years in backend and automation',ru:'Applied AI Engineer · 7+ лет в backend и автоматизации'},
    body:{en:'I turn complicated operations into AI tools people can use: backend systems, automation, assistants and human review workflows.',ru:'Превращаю сложные процессы в полезные AI-инструменты: backend-системы, автоматизацию, ассистентов и сценарии с проверкой человеком.'},
    note:{en:'Engineering meets everyday work.',ru:'Инженерия для реальной работы.'}
  },
  {
    theme:'mint',label:{en:'RETAIL AI',ru:'AI В РИТЕЙЛЕ'},
    title:{en:'Make product knowledge useful <em>in the moment.</em>',ru:'Знания о товаре нужны <em>в момент выбора.</em>'},
    body:{en:'For a retail PWA, I built an AI product assistant around catalog data, backend integrations and a QR-based order handoff. The system was tested with 20–30 concurrent sessions.',ru:'Для торгового PWA я сделал AI-консультанта на данных каталога, backend-интеграции и передачу заказа через QR. Систему проверили на 20–30 одновременных сессиях.'},
    metrics:[['20–30',{en:'concurrent test sessions',ru:'одновременных тестовых сессий'}],['~3×',{en:'less consultant queue load',ru:'снижение нагрузки на очередь к консультантам'}]],
    href:'https://github.com/kokolsk1y/zalassist', link:{en:'Explore ZalAssist on GitHub',ru:'Посмотреть ZalAssist на GitHub'}, stack:'SvelteKit · AI assistant · catalog search',note:{en:'From catalog data to helpful answers.',ru:'От каталога к полезному ответу.'}
  },
  {
    theme:'violet',label:{en:'AUTOMATION',ru:'АВТОМАТИЗАЦИЯ'},
    title:{en:'Give the repetitive work <em>to the system.</em>',ru:'Повторяющуюся работу — <em>системе.</em>'},
    body:{en:'I built review workflows across marketplaces, maps and web: knowledge enrichment, multimodal checks, LLM drafting and human approval. Operators stay in control while the routine moves faster.',ru:'Я построил обработку отзывов с маркетплейсов, карт и сайта: обогащение знаниями, мультимодальные проверки, черновики от LLM и согласование человеком. Оператор сохраняет контроль, а рутина идёт быстрее.'},
    metrics:[['~200',{en:'n8n workflow nodes',ru:'узлов n8n'}],['4h to 10m',{en:'daily manual work, approximately',ru:'ручной работы в день, примерно'}]],
    href:'https://github.com/kokolsk1y/operator-card-bot',link:{en:'See a public operator workflow',ru:'Посмотреть публичный операторский проект'},stack:'n8n · LLM APIs · Telegram · human review',note:{en:'Automation with a human checkpoint.',ru:'Автоматизация с контролем человека.'}
  },
  {
    theme:'blue',label:{en:'EVALUATION',ru:'ОЦЕНКА LLM'},
    title:{en:'An AI answer is a start. <em>Evidence is the finish.</em>',ru:'Ответ AI — начало. <em>Проверка — результат.</em>'},
    body:{en:'My evaluation workflows use repeated model runs, hidden test cases, scoring and human review. I build for decisions that can be checked, improved and explained.',ru:'В моих сценариях оценки есть повторные прогоны модели, скрытые тесты, баллы и проверка человеком. Решения можно проверить, улучшить и объяснить.'},
    metrics:[[{en:'Test',ru:'Тесты'},{en:'hidden cases',ru:'скрытые кейсы'}],[{en:'Review',ru:'Проверка'},{en:'human judgement',ru:'решение человека'}],[{en:'Iterate',ru:'Итерация'},{en:'better next run',ru:'следующий прогон лучше'}]],
    href:'https://github.com/kokolsk1y/assistant-hub',link:{en:'View public evaluation work',ru:'Посмотреть публичный проект оценки'},stack:'LLM evaluation · prompts · scoring',note:{en:'Useful AI must be assessable.',ru:'Полезный AI должен быть проверяемым.'}
  },
  {
    theme:'gold',label:{en:'THE PATH',ru:'ПУТЬ'},
    title:{en:'Backend foundations. <em>Applied AI now.</em>',ru:'Основа — backend. <em>Сейчас — Applied AI.</em>'},
    path:[
      ['2019—2021',{en:'Java and Python backend work at Macy’s and Sharp Decisions.',ru:'Java и Python backend в Macy’s и Sharp Decisions.'}],
      ['2022—2024',{en:'AI automation at Nelson Connects; Python backend engineering at Turing.',ru:'AI-автоматизация в Nelson Connects; Python backend в Turing.'}],
      ['2025—NOW',{en:'Independent Applied AI work, from problem framing through delivery.',ru:'Самостоятельные Applied AI проекты: от постановки задачи до результата.'}]
    ],
    education:{en:'Electronics Engineering · Immanuel Kant Baltic Federal University<br>AI Engineering coursework / professional training · Beihang University',ru:'Электроника · Балтийский федеральный университет им. И. Канта<br>Курс / профессиональная подготовка по AI Engineering · Beihang University'},
    note:{en:'The through-line is building systems.',ru:'Общая нить — построение систем.'}
  },
  {
    theme:'coral',label:{en:'YOUR TURN',ru:'ВАША ОЧЕРЕДЬ'},
    title:{en:'Let’s make this <em>about your role.</em>',ru:'Теперь — <em>о вашей роли.</em>'},
    body:{en:'Pick the capabilities your team needs. Swipe right for relevant, left for less relevant. Every card shows where I learned it and put it to work. At the end you’ll get a shortlist with project evidence.',ru:'Выберите навыки, нужные команде. Вправо — важное, влево — менее актуальное. На каждой карточке написано, где я освоил навык и применил его. В финале — подборка проектов.'},
    note:{en:'A personal shortlist in two minutes.',ru:'Личный список за две минуты.'}
  }
];

const projects = {
  zalassist:{title:'ZalAssist',url:'https://github.com/kokolsk1y/zalassist',summary:{en:'Retail AI assistant and catalog-grounded PWA.',ru:'Ритейл-PWA с AI-консультантом и каталогом.'}},
  operator:{title:'Operator Card Bot',url:'https://github.com/kokolsk1y/operator-card-bot',summary:{en:'Operator workflow for AI-assisted product cards.',ru:'Операторский процесс создания карточек товаров с AI.'}},
  hub:{title:'Assistant Hub',url:'https://github.com/kokolsk1y/assistant-hub',summary:{en:'LLM evaluation tooling and product architecture.',ru:'Инструменты оценки LLM и архитектура продукта.'}},
  aws:{title:'AWS Brand Site',url:'https://github.com/kokolsk1y/aws-brand-site',summary:{en:'Astro catalog, data workflows and retail web.',ru:'Astro-каталог, работа с данными и ритейл-web.'}},
  tablemind:{title:'TableMind Site',url:'https://github.com/kokolsk1y/tablemind-site',summary:{en:'Public site for an AI-assisted restaurant product.',ru:'Публичный сайт AI-продукта для ресторанов.'}},
  tv:{title:'ElectroCenter TV',url:'https://github.com/kokolsk1y/electrocentre-tv',summary:{en:'In-store display and content workflow.',ru:'Экран в торговом зале и процесс обновления контента.'}}
};

const skills = [
  {title:'Python & FastAPI',symbol:'⌘',category:'BACKEND',description:{en:'APIs and services that connect product logic to the real world.',ru:'API и сервисы, связывающие продуктовую логику с реальным миром.'},learned:{en:'Python backend roles at Sharp Decisions and Turing.',ru:'Python backend в Sharp Decisions и Turing.'},used:{en:'REST services, integrations and independent AI products.',ru:'REST-сервисы, интеграции и самостоятельные AI-продукты.'},projects:['zalassist','hub']},
  {title:'Java & Spring Boot',symbol:'▣',category:'BACKEND',description:{en:'A foundation in structured backend engineering.',ru:'Фундамент системной backend-разработки.'},learned:{en:'Backend engineering at Macy’s.',ru:'Backend-разработка в Macy’s.'},used:{en:'Enterprise backend systems and service development.',ru:'Корпоративные backend-системы и сервисы.'},projects:[]},
  {title:'REST APIs',symbol:'⇄',category:'INTEGRATION',description:{en:'Clear interfaces between systems, products and teams.',ru:'Понятные интерфейсы между системами, продуктами и командами.'},learned:{en:'Backend roles across Java and Python.',ru:'Backend-роли на Java и Python.'},used:{en:'Turing services and retail backend integrations.',ru:'Сервисы в Turing и интеграции в ритейле.'},projects:['zalassist','aws']},
  {title:'PostgreSQL & SQL',symbol:'▤',category:'DATA',description:{en:'Reliable storage and querying for operational products.',ru:'Надёжное хранение и запросы для рабочих продуктов.'},learned:{en:'Backend engineering and independent product work.',ru:'Backend-разработка и самостоятельные продукты.'},used:{en:'Applied AI workflows, service data and integrations.',ru:'Applied AI процессы, данные сервисов и интеграции.'},projects:['hub']},
  {title:'n8n Automation',symbol:'◈',category:'AUTOMATION',description:{en:'Multi-step workflows that remove manual repetition.',ru:'Многошаговые процессы, снимающие ручную рутину.'},learned:{en:'AI automation at Nelson Connects; independent projects.',ru:'AI-автоматизация в Nelson Connects и собственных проектах.'},used:{en:'Review workflows across marketplaces, maps and web.',ru:'Обработка отзывов маркетплейсов, карт и сайта.'},projects:['operator']},
  {title:'LLM Integration',symbol:'✳',category:'APPLIED AI',description:{en:'Model calls designed as part of a complete workflow.',ru:'Встраивание моделей в полноценные рабочие процессы.'},learned:{en:'AI automation work and independent delivery.',ru:'Работа с AI-автоматизацией и самостоятельные проекты.'},used:{en:'Retail assistant, review automation and evaluation.',ru:'Ритейл-ассистент, обработка отзывов и оценка моделей.'},projects:['zalassist','hub']},
  {title:'RAG & Grounding',symbol:'◎',category:'APPLIED AI',description:{en:'Connect model answers to domain knowledge and source data.',ru:'Связь ответов модели с предметными знаниями и данными.'},learned:{en:'Independent Applied AI work.',ru:'Самостоятельные Applied AI проекты.'},used:{en:'Catalog-grounded assistants and knowledge-enriched workflows.',ru:'Ассистенты на базе каталога и процессы с обогащением знаниями.'},projects:['zalassist']},
  {title:'MCP & Tools',symbol:'⛓',category:'APPLIED AI',description:{en:'Bring external tools into AI workflows with clear boundaries.',ru:'Подключение внешних инструментов к AI-процессам с понятными границами.'},learned:{en:'Independent AI systems work.',ru:'Самостоятельная работа над AI-системами.'},used:{en:'RAG- and MCP-enabled workflows with approval steps.',ru:'RAG- и MCP-процессы с шагами согласования.'},projects:['hub']},
  {title:'LLM Evaluation',symbol:'◇',category:'QUALITY',description:{en:'Repeated runs, hidden cases, scoring and human review.',ru:'Повторные прогоны, скрытые тесты, оценка и проверка человеком.'},learned:{en:'AI automation at Nelson Connects.',ru:'AI-автоматизация в Nelson Connects.'},used:{en:'Multi-stage candidate evaluation and independent tooling.',ru:'Многоэтапная оценка кандидатов и самостоятельные инструменты.'},projects:['hub']},
  {title:'Human-in-the-Loop',symbol:'✦',category:'QUALITY',description:{en:'Automation that keeps people in control of important choices.',ru:'Автоматизация, в которой важные решения остаются за людьми.'},learned:{en:'AI automation and operational product work.',ru:'AI-автоматизация и операционные продукты.'},used:{en:'Review moderation, approval and evaluation workflows.',ru:'Модерация отзывов, согласование и оценка моделей.'},projects:['operator','hub']},
  {title:'Docker & Delivery',symbol:'⬡',category:'DELIVERY',description:{en:'Move systems from local work to repeatable operation.',ru:'Переход от локальной разработки к повторяемой работе системы.'},learned:{en:'Independent product delivery.',ru:'Самостоятельный запуск продуктов.'},used:{en:'Backend and AI workflow deployment.',ru:'Развёртывание backend и AI-процессов.'},projects:['zalassist']},
  {title:'Git & Code Review',symbol:'⌁',category:'TEAMWORK',description:{en:'Build and improve within an existing engineering team.',ru:'Разработка и улучшение продукта в инженерной команде.'},learned:{en:'Backend roles in distributed teams.',ru:'Backend-роли в распределённых командах.'},used:{en:'Production code review at Turing and project work.',ru:'Code review в Turing и проектная работа.'},projects:['aws','tv']}
];

let language='en';
let sceneIndex=0;
let mode='story';
let skillIndex=0;
let choices=[];
let lastWheel=0;
let locked=false;
let transitioning=false;

function val(value){return typeof value==='string'?value:value[language]}
function sceneHtml(scene,index){
  const metricHtml=scene.metrics?`<div class="proof-strip ${index===3?'proof-words':''}">${scene.metrics.map(([number,label])=>`<div><strong>${val(number)}</strong><span>${val(label)}</span></div>`).join('')}</div>`:'';
  const pathHtml=scene.path?`<div class="path-list">${scene.path.map(([date,copy])=>`<div><span class="path-year">${date}</span><p>${val(copy)}</p></div>`).join('')}</div><div class="education-line"><span>${language==='en'?'EDUCATION':'ОБРАЗОВАНИЕ'}</span><p>${val(scene.education)}</p></div>`:'';
  const primary=index===0?`<div class="button-row"><button class="primary-button" type="button" data-action="next">${language==='en'?'Explore my work':'Посмотреть проекты'}</button><button class="subtle-button" type="button" data-action="match">${language==='en'?'Go straight to skill match':'Сразу к навыкам'}</button></div>`:index===5?`<div class="game-instruction"><span class="gesture">×</span><span>${language==='en'?'Less relevant':'Менее важно'}</span><span class="gesture right-gesture">✓</span><span>${language==='en'?'Need this':'Нужно'}</span></div><div class="button-row"><button class="primary-button" type="button" data-action="match">${language==='en'?'Start matching':'Начать подбор'}</button><a class="subtle-button" href="https://github.com/kokolsk1y" target="_blank" rel="noopener">${language==='en'?'Browse GitHub instead':'Посмотреть GitHub'}</a></div>`:'';
  const link=scene.href?`<div class="scene-footer"><a href="${scene.href}" target="_blank" rel="noopener">${val(scene.link)}</a><span>${scene.stack}</span></div>`:'';
  return `<div class="scene" data-theme="${scene.theme}"><div class="scene-card ${index===0?'hero-card':''}"><div class="eyebrow"><span class="eyebrow-line"></span><span>${val(scene.label)}</span></div>${scene.preface?`<p class="hero-preface">${val(scene.preface)}</p>`:''}<${index===0?'h1':'h2'}>${val(scene.title)}</${index===0?'h1':'h2'}>${scene.role?`<p class="hero-role">${val(scene.role)}</p>`:''}${scene.body?`<p class="scene-description">${val(scene.body)}</p>`:''}${metricHtml}${pathHtml}${link}${primary}</div><div class="scene-note"><span class="note-index">${val(scene.label)}</span><span>${val(scene.note)}</span></div></div>`;
}
function renderScene(){
  host.innerHTML=sceneHtml(scenes[sceneIndex],sceneIndex);
  $('#chapter-dots').innerHTML=scenes.map((scene,index)=>`<button type="button" class="chapter-dot ${index===sceneIndex?'active':''}" data-chapter="${index}" aria-label="${val(scene.label)}" aria-current="${index===sceneIndex?'step':'false'}"></button>`).join('');
  document.body.dataset.theme=scenes[sceneIndex].theme;
  document.dispatchEvent(new CustomEvent('portfolio-scene',{detail:{index:sceneIndex,theme:scenes[sceneIndex].theme}}));
  document.querySelectorAll('[data-go]').forEach(button=>button.classList.toggle('active',Number(button.dataset.go)===(sceneIndex===0?0:1)));
  const scrollHint=$('.scroll-hint');
  scrollHint.textContent=sceneIndex===scenes.length-1?ui[language].matchScrollHint:ui[language].scrollHint;
  scrollHint.classList.toggle('next-mode',sceneIndex===scenes.length-1);
  updateContactHint();
}
function goScene(next){if(transitioning)return;sceneIndex=Math.max(0,Math.min(scenes.length-1,next));if(mode!=='story')showMode('story');renderScene()}
function advanceStory(direction){if(transitioning)return;if(direction>0&&sceneIndex===scenes.length-1){slideBetweenStoryAndMatch('forward');return}goScene(sceneIndex+direction)}
function updateContactHint(){document.querySelector('.nav-contact').classList.toggle('contact-nudge',mode==='result'||(mode==='story'&&sceneIndex===scenes.length-1))}
function showMode(next){mode=next;story.hidden=next!=='story';match.hidden=next!=='match';result.hidden=next!=='result';document.body.dataset.mode=next;document.querySelectorAll('[data-go]').forEach(button=>button.classList.toggle('active',next==='story'&&Number(button.dataset.go)===(sceneIndex===0?0:1)));$('#nav-skills').classList.toggle('active',next!=='story');updateContactHint();window.scrollTo({top:0,behavior:'instant'});document.dispatchEvent(new CustomEvent('portfolio-mode',{detail:{mode:next}}))}
function slideBetweenStoryAndMatch(direction){
  if(transitioning)return;
  if(direction==='forward'){choices=[];skillIndex=0;renderSkill();match.scrollTop=0}
  else{sceneIndex=scenes.length-1;renderScene();story.scrollTop=0}
  if(document.body.classList.contains('no-motion')||window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    showMode(direction==='forward'?'match':'story');
    if(direction==='forward')skillCard.focus({preventScroll:true});
    return;
  }
  transitioning=true;
  story.hidden=false;match.hidden=false;
  document.querySelectorAll('[data-go]').forEach(button=>button.classList.toggle('active',direction==='backward'&&Number(button.dataset.go)===1));
  $('#nav-skills').classList.toggle('active',direction==='forward');
  document.body.dataset.slide=direction;
  match.getBoundingClientRect();
  setTimeout(()=>document.body.classList.add('slide-active'),32);
  setTimeout(()=>{
    showMode(direction==='forward'?'match':'story');
    document.body.classList.remove('slide-active');delete document.body.dataset.slide;
    transitioning=false;
    if(direction==='forward')skillCard.focus({preventScroll:true});
  },900);
}
function applyLanguage(next){
  if(transitioning)return;
  language=next;document.documentElement.lang=next;
  document.querySelectorAll('[data-i18n]').forEach(node=>{const text=ui[next][node.dataset.i18n];if(typeof text==='string')node.textContent=text});
  $('#lang-en').classList.toggle('selected',next==='en');$('#lang-ru').classList.toggle('selected',next==='ru');
  $('#lang-en').setAttribute('aria-pressed',String(next==='en'));$('#lang-ru').setAttribute('aria-pressed',String(next==='ru'));
  if(mode==='story')renderScene();if(mode==='match')renderSkill();if(mode==='result')renderResult();
}
function showMatch(reset=false){if(transitioning)return;if(reset){choices=[];skillIndex=0}showMode('match');renderSkill();skillCard.focus({preventScroll:true})}
function renderSkill(){
  if(skillIndex>=skills.length){showMode('result');renderResult();return}
  const skill=skills[skillIndex];const proof=skill.projects[0]?projects[skill.projects[0]]:null;
  $('#match-progress-fill').style.width=`${(skillIndex/skills.length)*100}%`;
  $('#match-shortlist-count').textContent=ui[language].selected;
  $('#undo-skill').disabled=skillIndex===0;
  skillCard.className='skill-card';skillCard.style.transform='';skillCard.innerHTML=`<div class="card-topline"><span>${skill.category}</span><span class="card-topline-dot"></span></div><span class="swipe-stamp yes">${language==='en'?'NEED':'НУЖНО'}</span><span class="swipe-stamp no">${language==='en'?'PASS':'МЕНЕЕ ВАЖНО'}</span><div class="card-symbol" aria-hidden="true">${skill.symbol}</div><h3>${skill.title}</h3><p class="skill-intro">${val(skill.description)}</p><div class="skill-evidence"><span>${ui[language].learned}</span><p>${val(skill.learned)}</p></div><div class="skill-evidence"><span>${ui[language].used}</span><p>${val(skill.used)}</p></div>${proof?`<a href="${proof.url}" target="_blank" rel="noopener">${ui[language].proof}</a>`:`<span class="private-proof">${ui[language].privateProof}</span>`}`;
}
function chooseSkill(needed){if(locked||mode!=='match')return;locked=true;choices[skillIndex]=needed;skillCard.classList.add(needed?'out-right':'out-left');setTimeout(()=>{skillIndex++;locked=false;renderSkill()},330)}
function undoSkill(){if(locked||skillIndex===0)return;skillIndex--;choices.length=skillIndex;renderSkill()}
function renderResult(){
  const picked=skills.filter((_,i)=>choices[i]);
  $('#result-title').textContent=language==='en'?(picked.length?'It’s a match.':'Let’s find the fit.'):(picked.length?'У нас совпадение.':'Найдём точку совпадения.');
  $('#result-intro').textContent=ui[language].resultIntro(picked.length);
  $('#result-bridge').textContent=ui[language].bridge(picked);
  $('#selected-skills').innerHTML=picked.length?picked.map(skill=>`<span>${skill.title}</span>`).join(''):`<span>${ui[language].noSelection}</span>`;
  const scores={};picked.forEach(skill=>skill.projects.forEach(id=>{scores[id]=(scores[id]||0)+1}));
  const ids=Object.keys(scores).sort((a,b)=>scores[b]-scores[a]).slice(0,3);
  if(!ids.length)ids.push('zalassist','operator','hub');
  $('#result-projects').innerHTML=ids.map(id=>`<div class="project-result"><div><strong>${projects[id].title}</strong><p>${val(projects[id].summary)}</p></div><a href="${projects[id].url}" target="_blank" rel="noopener">${ui[language].projectLink}</a></div>`).join('');
}

host.addEventListener('click',(event)=>{const action=event.target.closest('[data-action]')?.dataset.action;if(action==='next')advanceStory(1);if(action==='match'){if(sceneIndex===scenes.length-1)slideBetweenStoryAndMatch('forward');else showMatch(true)}});
document.querySelectorAll('[data-go]').forEach(button=>button.addEventListener('click',()=>goScene(Number(button.dataset.go))));
$('#brand-link').addEventListener('click',(event)=>{event.preventDefault();goScene(0)});
$('#nav-skills').addEventListener('click',()=>{if(mode==='story'&&sceneIndex===scenes.length-1)slideBetweenStoryAndMatch('forward');else showMatch(true)});
$('#chapter-dots').addEventListener('click',(event)=>{const dot=event.target.closest('[data-chapter]');if(dot)goScene(Number(dot.dataset.chapter))});
$('#lang-en').addEventListener('click',()=>applyLanguage('en'));
$('#lang-ru').addEventListener('click',()=>applyLanguage('ru'));
$('#exit-match').addEventListener('click',()=>slideBetweenStoryAndMatch('backward'));
$('#skip-skill').addEventListener('click',()=>chooseSkill(false));
$('#choose-skill').addEventListener('click',()=>chooseSkill(true));
$('#undo-skill').addEventListener('click',undoSkill);
$('#restart-match').addEventListener('click',()=>showMatch(true));
$('#motion-toggle').addEventListener('click',()=>{const off=document.body.classList.toggle('no-motion');$('#motion-toggle').setAttribute('aria-pressed',String(off));document.dispatchEvent(new CustomEvent('portfolio-motion',{detail:{off}}))});

document.addEventListener('keydown',(event)=>{
  if(transitioning)return;
  if(event.altKey||event.ctrlKey||event.metaKey||['INPUT','TEXTAREA'].includes(document.activeElement?.tagName))return;
  if(mode==='story'){
    if(event.key==='ArrowRight'||event.key==='ArrowDown'||event.key==='PageDown'){event.preventDefault();advanceStory(1)}
    if(event.key==='ArrowLeft'||event.key==='ArrowUp'||event.key==='PageUp'){event.preventDefault();goScene(sceneIndex-1)}
  }else if(mode==='match'){
    if(event.key==='ArrowRight'){event.preventDefault();chooseSkill(true)}
    if(event.key==='ArrowLeft'){event.preventDefault();chooseSkill(false)}
    if(event.key==='Backspace'){event.preventDefault();undoSkill()}
    if(event.key==='Escape')slideBetweenStoryAndMatch('backward');
  }else if(mode==='result'&&event.key==='Escape')goScene(5);
});
document.addEventListener('wheel',(event)=>{if(mode!=='story'||event.ctrlKey)return;event.preventDefault();if(transitioning||Math.abs(event.deltaY)<16)return;const now=Date.now();if(now-lastWheel<650)return;lastWheel=now;advanceStory(event.deltaY>0?1:-1)},{passive:false});
let storyTouchY=null;
story.addEventListener('touchstart',(event)=>{if(event.target.closest('button,a'))return;storyTouchY=event.touches[0]?.clientY??null},{passive:true});
story.addEventListener('touchend',(event)=>{if(mode!=='story'||storyTouchY===null)return;const difference=storyTouchY-(event.changedTouches[0]?.clientY??storyTouchY);storyTouchY=null;if(Math.abs(difference)>65)advanceStory(difference>0?1:-1)},{passive:true});

let startX=0,startY=0,dragging=false;
skillCard.addEventListener('pointerdown',(event)=>{if(mode!=='match'||event.target.closest('a'))return;startX=event.clientX;startY=event.clientY;dragging=true;skillCard.setPointerCapture(event.pointerId);skillCard.classList.add('dragging')});
skillCard.addEventListener('pointermove',(event)=>{if(!dragging)return;const dx=event.clientX-startX;const dy=event.clientY-startY;skillCard.style.transform=`translate(${dx}px,${dy*.25}px) rotate(${dx*.045}deg)`;const strength=Math.min(1,Math.abs(dx)/120);skillCard.querySelector(dx>=0?'.swipe-stamp.yes':'.swipe-stamp.no').style.opacity=strength;skillCard.querySelector(dx>=0?'.swipe-stamp.no':'.swipe-stamp.yes').style.opacity=0});
function endDrag(event){if(!dragging)return;dragging=false;skillCard.classList.remove('dragging');const dx=event.clientX-startX;if(Math.abs(dx)>105)chooseSkill(dx>0);else{skillCard.style.transform='';skillCard.querySelectorAll('.swipe-stamp').forEach(stamp=>stamp.style.opacity=0)}}
skillCard.addEventListener('pointerup',endDrag);skillCard.addEventListener('pointercancel',endDrag);

$('#year').textContent=new Date().getFullYear();
applyLanguage('en');showMode('story');
