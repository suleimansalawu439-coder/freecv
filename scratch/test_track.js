const payload = {
  job_url: "https://example.com/job",
  job_title: "Software Engineer",
  company: "Google",
};

fetch("http://192.168.0.145:3000/api/jobs/track", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
})
.then(res => res.json().then(data => ({ status: res.status, data })))
.then(console.log)
.catch(console.error);
