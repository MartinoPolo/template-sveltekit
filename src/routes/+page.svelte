<script lang="ts">
	import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { Checkbox } from '$lib/components/ui/checkbox/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import * as Alert from '$lib/components/ui/alert/index.js';
	import CircleCheck from '@lucide/svelte/icons/circle-check';
	import TriangleAlert from '@lucide/svelte/icons/triangle-alert';
	import Info from '@lucide/svelte/icons/info';
	import Mail from '@lucide/svelte/icons/mail';
	import Loader from '@lucide/svelte/icons/loader';

	const frameworks = [
		{ value: 'sveltekit', label: 'SvelteKit' },
		{ value: 'nextjs', label: 'Next.js' },
		{ value: 'nuxt', label: 'Nuxt' },
		{ value: 'remix', label: 'Remix' },
	] as const;

	const roles = [
		{ value: 'admin', label: 'Admin' },
		{ value: 'editor', label: 'Editor' },
		{ value: 'viewer', label: 'Viewer' },
	] as const;

	let frameworkValue = $state('');
	let roleValue = $state('');

	const frameworkLabel = $derived(
		frameworks.find((f) => f.value === frameworkValue)?.label ?? 'Select a framework',
	);
	const roleLabel = $derived(roles.find((r) => r.value === roleValue)?.label ?? 'Select a role');
</script>

<main class="min-h-screen bg-background text-foreground">
	<!-- Header -->
	<header class="border-b border-border">
		<div class="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
			<h1 class="text-xl font-bold tracking-tight">SvelteKit Template</h1>
			<DarkModeToggle />
		</div>
	</header>

	<div class="mx-auto max-w-5xl space-y-12 px-6 py-12">
		<!-- Hero -->
		<section class="space-y-3 text-center">
			<h2 class="text-4xl font-extrabold tracking-tight">Component Showcase</h2>
			<p class="text-muted-foreground text-lg">
				shadcn-svelte components with a green theme, light &amp; dark mode support.
			</p>
		</section>

		<Separator />

		<!-- Buttons -->
		<section class="space-y-4">
			<h3 class="text-2xl font-semibold tracking-tight">Buttons</h3>
			<div class="flex flex-wrap items-center gap-3">
				<Button>Default</Button>
				<Button variant="secondary">Secondary</Button>
				<Button variant="outline">Outline</Button>
				<Button variant="ghost">Ghost</Button>
				<Button variant="link">Link</Button>
				<Button variant="destructive">Destructive</Button>
			</div>
			<div class="flex flex-wrap items-center gap-3">
				<Button size="sm">Small</Button>
				<Button size="default">Default</Button>
				<Button size="lg">Large</Button>
				<Button size="icon" aria-label="Send email"><Mail size={16} /></Button>
			</div>
			<div class="flex flex-wrap items-center gap-3">
				<Button disabled>Disabled</Button>
				<Button>
					<Loader class="animate-spin" size={16} />
					Loading...
				</Button>
			</div>
		</section>

		<Separator />

		<!-- Badges -->
		<section class="space-y-4">
			<h3 class="text-2xl font-semibold tracking-tight">Badges</h3>
			<div class="flex flex-wrap items-center gap-3">
				<Badge>Default</Badge>
				<Badge variant="secondary">Secondary</Badge>
				<Badge variant="outline">Outline</Badge>
				<Badge variant="destructive">Destructive</Badge>
			</div>
		</section>

		<Separator />

		<!-- Cards & Form Elements -->
		<section class="space-y-4">
			<h3 class="text-2xl font-semibold tracking-tight">Cards &amp; Form Elements</h3>
			<div class="grid gap-6 md:grid-cols-2">
				<!-- Input Card -->
				<Card.Root>
					<Card.Header>
						<Card.Title>Text Inputs</Card.Title>
						<Card.Description>Standard input fields and textarea.</Card.Description>
					</Card.Header>
					<Card.Content class="space-y-4">
						<div class="space-y-2">
							<Label for="name">Name</Label>
							<Input id="name" placeholder="Enter your name" />
						</div>
						<div class="space-y-2">
							<Label for="email">Email</Label>
							<Input id="email" type="email" placeholder="you@example.com" />
						</div>
						<div class="space-y-2">
							<Label for="bio">Bio</Label>
							<Textarea id="bio" placeholder="Tell us about yourself…" />
						</div>
					</Card.Content>
					<Card.Footer>
						<Button class="w-full">Submit</Button>
					</Card.Footer>
				</Card.Root>

				<!-- Select & Controls Card -->
				<Card.Root>
					<Card.Header>
						<Card.Title>Select &amp; Controls</Card.Title>
						<Card.Description>Dropdowns, switches, and checkboxes.</Card.Description>
					</Card.Header>
					<Card.Content class="space-y-6">
						<div class="space-y-2">
							<Label>Framework</Label>
							<Select.Root type="single" bind:value={frameworkValue}>
								<Select.Trigger class="w-full">
									{frameworkLabel}
								</Select.Trigger>
								<Select.Content>
									{#each frameworks as fw (fw.value)}
										<Select.Item value={fw.value} label={fw.label}>
											{fw.label}
										</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						</div>
						<div class="space-y-2">
							<Label>Role</Label>
							<Select.Root type="single" bind:value={roleValue}>
								<Select.Trigger class="w-full">
									{roleLabel}
								</Select.Trigger>
								<Select.Content>
									{#each roles as role (role.value)}
										<Select.Item value={role.value} label={role.label}>
											{role.label}
										</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						</div>
						<Separator />
						<div class="flex items-center justify-between">
							<Label for="notifications">Enable notifications</Label>
							<Switch id="notifications" />
						</div>
						<div class="flex items-center justify-between">
							<Label for="marketing">Marketing emails</Label>
							<Switch id="marketing" />
						</div>
						<Separator />
						<div class="flex flex-col gap-3">
							<span class="text-sm font-medium">Interests</span>
							<div class="flex items-center gap-2">
								<Checkbox id="frontend" />
								<Label for="frontend" class="font-normal">Frontend</Label>
							</div>
							<div class="flex items-center gap-2">
								<Checkbox id="backend" />
								<Label for="backend" class="font-normal">Backend</Label>
							</div>
							<div class="flex items-center gap-2">
								<Checkbox id="devops" />
								<Label for="devops" class="font-normal">DevOps</Label>
							</div>
						</div>
					</Card.Content>
				</Card.Root>
			</div>
		</section>

		<Separator />

		<!-- Alerts -->
		<section class="space-y-4">
			<h3 class="text-2xl font-semibold tracking-tight">Alerts</h3>
			<div class="space-y-3">
				<Alert.Root>
					<Info size={16} />
					<Alert.Title>Information</Alert.Title>
					<Alert.Description>
						This is an informational alert using the default variant.
					</Alert.Description>
				</Alert.Root>
				<Alert.Root variant="destructive">
					<TriangleAlert size={16} />
					<Alert.Title>Error</Alert.Title>
					<Alert.Description>
						Something went wrong. Please try again later.
					</Alert.Description>
				</Alert.Root>
				<Alert.Root class="border-primary/50 text-primary [&>svg]:text-primary">
					<CircleCheck size={16} />
					<Alert.Title>Success</Alert.Title>
					<Alert.Description>
						Your changes have been saved successfully.
					</Alert.Description>
				</Alert.Root>
			</div>
		</section>

		<!-- Footer -->
		<Separator />
		<footer class="text-muted-foreground pb-8 text-center text-sm">
			Built with SvelteKit, Tailwind CSS &amp; shadcn-svelte
		</footer>
	</div>
</main>
