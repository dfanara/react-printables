---
layout: default
title: Home
---

## Introduction

Hey there! From time to time I make printable page layouts using some combination or react or HTML. Being a software engineer, I find that I can produce these pages faster in code than I can with tools like Microsoft Publisher or Affinity Publisher. My workflow is generally to write the HTML from scratch, then save the page as a PDF for print. I always lose the PDFs or don't have a good process for version management, so with this GitHub repo I can build out these printable documents in GitHub actions and publish them for all to use.

Some pages I generally use are check lists, column layouts, some concept sketching pages with areas for notes and a title, page #, etc. I like to bundle these pages and save them in binders from time to time, just to archive some of my sketches, measurements, and more.

When possible, I will try to include internation page sizes, but I generally only print standard US letter pages, so no promises there.

## Printable Pages

<div class="document-grid">
  {% for printable in site.documents %}
      <div class="card">
        <a href="{{site.baseurl}}{{printable.url}}">
          <div class="preview">
            <img src="{{site.baseurl}}{{printable.previewImage}}" />
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