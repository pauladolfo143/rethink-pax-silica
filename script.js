
document.addEventListener("DOMContentLoaded",()=>{
    const loader=document.getElementById("pageLoader");
    window.addEventListener("load",()=>setTimeout(()=>loader?.classList.add("hide"),300));

    // Sidebar animation from the original idea
    const menuBtn=document.getElementById("menuBtn");
    const closeBtn=document.getElementById("closeBtn");
    const sidebar=document.getElementById("sidebar");
    const overlay=document.getElementById("overlay");

    function closeSidebar(){
        sidebar?.classList.remove("active");
        overlay?.classList.remove("active");
        document.body.style.overflow="";
    }
    menuBtn?.addEventListener("click",()=>{
        sidebar?.classList.add("active");
        overlay?.classList.add("active");
        document.body.style.overflow="hidden";
    });
    closeBtn?.addEventListener("click",closeSidebar);
    overlay?.addEventListener("click",closeSidebar);
    document.querySelectorAll(".sidebar a").forEach(a=>a.addEventListener("click",closeSidebar));
    document.addEventListener("keydown",e=>{if(e.key==="Escape")closeSidebar()});

    // Scroll reveal animation
    const observer=new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },{threshold:.12});
    document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

    // Active navigation on each page
    const current=location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll("nav a.link").forEach(link=>{
        if(link.getAttribute("href")===current) link.classList.add("active");
    });

    // Contact form — demonstration only
    const form=document.getElementById("contactForm");
    const msg=document.getElementById("formMessage");
    form?.addEventListener("submit",e=>{
        e.preventDefault();
        const name=document.getElementById("name")?.value.trim();
        const email=document.getElementById("email")?.value.trim();

        if(!name || !email){
            msg.textContent="Please complete your name and email.";
            return;
        }
        if(!email.includes("@")){
            msg.textContent="Please enter a valid email address.";
            return;
        }
        msg.textContent=`Thank you, ${name}! Your message has been recorded for this project.`;
        form.reset();
    });
});
