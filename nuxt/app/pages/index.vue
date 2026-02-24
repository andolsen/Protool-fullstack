<template>
	<div class="bg-zinc-800 w-screen h-screen">
		<div class="flex flex-col items-center justify-center h-full">
			<h1 class="text-green-400 text-center text-4xl font-bold">Nuxt stack</h1>
			<div class="m-5">
				<ul class="flex gap-2">
					<li class="text-white">
						<LinkComponent to="/fetch">Fetch</LinkComponent>
					</li>
					<li>
						<LinkComponent to="/form">Form</LinkComponent>
					</li>
					<li>
						<LinkComponent to="/login">Login</LinkComponent>
					</li>
					<li>
						<LinkComponent to="/protected">Protected</LinkComponent>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
