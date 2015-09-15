<div class="team-card--{{size}}">
	<div class="team-card__image--{{style}}">
		{pic:image}
	</div>
	<div class="team-card__content">
		<div class="name">{name:text default="Name"}</div>
		<div class="title">{position:text default="Position"}</div>
	</div>
	<div class="team-card__extras">
		<a class="button" href="{{button_link}}" style="text-align: center;">{button_text:text default="Learn More"}</a>
		<div class="text">{extras_text:text default="Donec ullamcorper nulla non metus auctor fringilla."}</div>
	</div>
</div>