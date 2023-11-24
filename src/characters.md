---
layout: base.njk
pageTitle: Characters
---

# Characters

<ul class="thumb-list">
{%- for page in collections.character -%}
	{% set setting = collections.all | getPageById(page.data.setting) %}
  <li class="thumb-list-item">
		<article class="thumb-item-box">
			<a href="{{page.url}}">
				<img 
					alt="{{page.data.pageTitle}}" 
					src="{{metadata.assets.img}}/{{page.data.thumbnailUrl}}" 
					class="thumbnail"/>
				<div class="thumb-footer">{{page.data.pageTitle}}</div>
			</a>
		</article>
	</li>
{%- endfor -%}
</ul>