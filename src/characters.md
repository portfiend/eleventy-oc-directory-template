---
layout: base.njk
pageTitle: Characters
---

# Characters

<ul class="thumb-list">
{%- for page in collections.character -%}
	{% set setting = collections.all | getPageById(page.data.setting) %}
  <li class="thumb-list-item">
		{% thumbnail page %}
	</li>
{%- endfor -%}
</ul>