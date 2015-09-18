<div class="team-card--{{size}}">
	<div class="team-card__image--{{style}}">
		{pic:image}
	</div>
	<div class="team-card__content">
		<div class="name">{name:text default="Name"}</div>
		<div class="title">{position:text default="Position"}</div>
	</div>
	{{#extra_area}}
	<div class="team-card__extras">
		{extra_content:content}
	</div>
	{{/extra_area}}
</div>