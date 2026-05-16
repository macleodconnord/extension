<template>
	<div class="relative max-w-5xl mx-auto">
		<nav class="bg-yellow-500 py-2 text-white" aria-label="Promotions">
			<div class="relative overflow-hidden max-w-full">
				<div class="animate-marquee whitespace-nowrap px-4">
					<template v-for="advert in adverts" :key="advert.text">
						<a
							:href="advert.href"
							target="_blank"
							rel="noopener noreferrer"
							:title="advert.text"
							class="btn btn-sm btn-ghost"
						>
							{{ advert.text }}
						</a>
						<span class="mx-2 opacity-50" aria-hidden="true"
							>|</span
						>
					</template>
				</div>
			</div>
		</nav>

		<header class="p-4 mb-2 w-full mx-auto text-center">
			<a
				href="https://opendyslexic.org?utm_source=opendyslexic-chrome&utm_medium=referral"
				target="_blank"
				rel="noopener noreferrer"
				class="btn btn-ghost normal-case text-2xl mx-auto text-center"
			>
				OpenDyslexic
			</a>
		</header>

		<main class="p-4">
			<div class="card shadow-lg card-sm bg-base-100 text-base-content">
				<div class="card-body">
					<div class="flex my-4">
						<div class="flex-1">
							<h2 class="card-title font-normal text-lg">
								{{
									enable
										? $helperbird_i18n('on')
										: $helperbird_i18n('off')
								}}
							</h2>
						</div>

						<label class="flex items-center gap-2">
							<span class="sr-only">
								{{ $helperbird_i18n('toggleExtension') }}
							</span>
							<input
								type="checkbox"
								class="toggle toggle-primary"
								v-model="enable"
								@change="save('enabled')"
							/>
						</label>
					</div>

					<div class="my-4">
						<div
							class="grid grid-cols-1 max-h-48 overflow-auto gap-2"
							role="list"
							:aria-label="
								$helperbird_i18n(
									'feature_specialized_font_options'
								)
							"
						>
							<template v-for="font in fonts" :key="font.title">
								<button
									:class="[
										'btn',
										'flex',
										'items-center',
										'justify-between',
										'normal-case',
										'gap-2',
										'text-sm',
										'w-full',
										'text-left',
										`opendyslexic-font-${font.font}`,
										{
											'btn-active':
												font.title ===
												selectedFont.title
										}
									]"
									:aria-label="
										$helperbird_i18n(
											'change_font_to_x',
											font.title
										)
									"
									:title="
										$helperbird_i18n(
											'change_font_to_x',
											font.title
										)
									"
									type="button"
									role="listitem"
									@click="save('font', font)"
								>
									{{ font.title }}
									<span
										v-if="font.title === selectedFont.title"
										class="btn btn-circle btn-xs btn-active btn-success ml-auto"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 -960 960 960"
											class="h-4 w-4"
											fill="#ffffff"
											aria-hidden="true"
										>
											<path
												d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"
											/>
										</svg>
									</span>
								</button>
							</template>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script>
	import './index.css';
	import { isEmpty } from '@scripts/content/utils';
	import getAdverts from '@scripts/adverts';

	const FONTS = [
		{ title: 'OpenDyslexic', font: 'regular' },
		{ title: 'OpenDyslexic Bold', font: 'bold' },
		{ title: 'OpenDyslexic Italic', font: 'italic' }
	];

	export default {
		inject: ['$helperbird_i18n'],

		data() {
			return {
				enable: null,
				adverts: getAdverts(this.$helperbird_i18n),
				selectedFont: { title: 'OpenDyslexic', font: 'regular' },
				fonts: FONTS
			};
		},

		mounted() {
			chrome.storage.local.get(['font', 'enabled'], (settings) => {
				if (chrome.runtime.lastError) {
					console.error(
						'Storage error:',
						chrome.runtime.lastError.message
					);
					return;
				}

				const found = this.fonts.find((f) => f.font === settings.font);
				if (found) {
					this.selectedFont = found;
				}
				this.enable = !!settings.enabled;
			});
		},

		methods: {
			sync(key, value) {
				const setting = { [key]: value };
				chrome.storage.local.set(setting);
				return setting;
			},

			save(featureID, selected) {
				switch (featureID) {
					case 'enabled':
						this.sync('enabled', this.enable);
						break;
					case 'font':
						if (!isEmpty(selected)) {
							this.selectedFont = selected;
							this.sync('font', this.selectedFont.font);
						}
						break;
					default:
						break;
				}

				this.toaster({
					message: this.$helperbird_i18n('saved'),
					type: 'success'
				});
			},

			toaster(config) {
				const msg = config.message || null;
				const type = config.type || 'info';

				if (isEmpty(msg)) return;

				switch (type) {
					case 'success':
						this.$toast.info(msg);
						break;
					case 'error':
						this.$toast.error(msg);
						break;
					case 'warning':
						this.$toast.warning(msg);
						break;
					default:
						this.$toast.info(msg);
				}
			}
		}
	};
</script>

<style lang="css" scoped>
	.opendyslexic-font-italic {
		font-style: italic;
		font-weight: 400;
	}

	.opendyslexic-font-bold {
		font-style: normal;
		font-weight: 700;
	}

	.opendyslexic-font-regular {
		font-style: normal;
		font-weight: 400;
	}

	@keyframes marquee {
		0% {
			transform: translateX(0%);
		}
		100% {
			transform: translateX(-100%);
		}
	}

	.animate-marquee {
		display: inline-block;
		will-change: transform;
		animation: marquee 80s linear infinite;
	}

	.animate-marquee:hover {
		animation-play-state: paused;
	}
</style>
