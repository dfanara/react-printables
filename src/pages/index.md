---
layout: default
title: Home
---

## Introduction

Hey there! From time to time I make printable page layouts using some combination or react or HTML. Being a software engineer, I find that I can produce these pages faster in code than I can with tools like Microsoft Publisher or Affinity Publisher. 

Rather than constantly loose my document designs, I decided to publish them here to share. The documents here are served as is, with no license restrictions. You are welcome to do with these as you please. Although not required, it would be nice of you to attribute documents back to this website for others to find.

When possible, I will try to include internation page sizes, but I generally only print standard US letter pages, so no promises there.

## Printable Pages

<div class="document-grid">
  {% for printable in site.documents %}
      <div class="card">
        <a href="{{site.baseurl}}{{printable.url}}">
          <div class="preview">
            <img src="{{site.baseurl}}{{printable.previewImages[0]}}" />
          </div>
        </a>
        <div class="flex-between">
          <div>
            <a href="{{site.baseurl}}{{printable.url}}">
              <p class="title">{{printable.title}}</p>
            </a>
            <p class="description">{{printable.description}}</p>
          </div>    
          <div style="padding: 8px">
            {% for size in printable.sizes %}
              <span class="pill-tag">{{size.size}}</span>
            {% endfor %}
          </div>
        </div>
      </div>
  {% endfor %}
</div>