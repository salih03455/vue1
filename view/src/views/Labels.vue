<template>
	<div class="labels">
		
		<div>
			
			<div v-if="errors.length">
				<b>Please correct the following error(s):</b>
				<ul>
					<li v-for="error in errors">{{ error }}</li>
				</ul>
			</div>

			<div v-if="success.status">
				{{ success.message }}
			</div>

			<div data-id="popup1" class="popup-wrapper" v-if="openPopup.popup1" @click.stop="closePopup">
				<div class="popup">
					<span><span>{{ fields[removeFieldIndex].type }}</span> öğesini silmek istediğinizden<br><b>emin misiniz?</b></span>
					<div class="popup-links">
						<a data-id="popup1" class="popup-link-close" @click.stop="closePopup">Vazgeçtim</a>
						<a class="popup-link-ok" @click.stop="removeField">Pek Tabiki</a>
					</div>
				</div>
			</div>

			<div data-id="popup2" class="popup-wrapper" v-if="openPopup.popup2" @click.stop="closePopup">
				<div class="popup">
					<div class="newField">
						<input type="text" @keyup.enter="saveNewField" ref="saveNewField" v-model="newFieldValue">
					</div>
					<div class="popup-links">
						<a data-id="popup2" class="popup-link-close" @click.stop="closePopup">Vazgeçtim</a>
						<a class="popup-link-ok" @click.stop="saveNewField">Ekle</a>
					</div>
				</div>
			</div>
			
			<div v-for="(field, index) in fields" class="form-group">
				<label for="name">{{ field.type }}</label>
				<input type="text" name="name" id="name" v-model="field.value">
				<div class="remove" @click="isRemoveField(index)"></div>
			</div>

			<div>
				<a href="#" @click.prevent="saveForm" class="submitLink">KAYDET</a>
			</div>

		</div>

		<span class="and">ya da</span>
			
		<a @click="addNewField" class="addNewField">YENİ ALAN EKLE</a>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				errors: [],
				newFieldValue: '',
				fields: [
					{ type: 'İsim', required: true, value: '' },
					{ type: 'Soyisim', required: true, value: '' },
					{ type: 'Kütük', required: true, value: '' },
					{ type: 'Tevellüt', required: true, value: '' }
				],
				openPopup: {
					popup1: false,
					popup2: false
				},
				success: {
					status: false,
					message: ''
				},
				removeFieldIndex: null
			}
		},
		methods: {
			addNewField() {
				this.openPopup.popup2 = true;
				this.$nextTick(() => {
					if (this.openPopup.popup2) this.$refs.saveNewField.focus();
				});
			},
			saveNewField() {
				this.openPopup.popup2 = false;
				this.fields.push({ type: this.newFieldValue, required: true, value: '' });
				this.newFieldValue = '';
			},
			isRemoveField(index) {
				this.openPopup.popup1 = true;
				this.removeFieldIndex = index;
			},
			removeField() {
				this.fields.splice(this.fields[this.removeFieldIndex], 1);
				this.openPopup.popup1 = false;
			},
			saveForm() {
				this.$http.post('http://localhost:3000/labels', { data: this.fields })
				.then(response => {
					this.success = {
						status: true,
						message: response.body.message
					};
					for(let i = 0; i < this.fields.length; i++){
						this.fields[i].value = '';
					}
					console.log(response);
				})
				.catch((err) => {
					console.log(err);
				});
			},
			closePopup(e) {
				let dataId = e.target.attributes.getNamedItem('data-id');
				if (dataId) {
					this.openPopup[dataId.value] = false;
				}
			}
		}
	}
</script>

<style lang="less">
.labels {
	width: 600px;
	margin: auto;
	text-align: left;
	.form-group {
		margin-bottom: 15px;
		background-color: #f1f1f1;
		padding: 10px;
		border-radius: 3px;
		position: relative;
	}
	.and {
		display: block;
		text-align: center;
		padding: 10px;
	}
	.addNewField,
	.submitLink {
		display: block;
		width: 100%;
		background: #92b01a;
		color: #fff;
		border: none;
		padding: 20px 10px;
		font-size: 16px;
		border-radius: 3px;
		font-weight: 700;
		letter-spacing: 1px;
		outline: none;
		text-align: center;
		cursor: pointer;
	}
	.submitLink {
		background-color: #00a1ff;
		text-decoration: none;
	}
	.popup-wrapper {
		position: fixed;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.8);
		left: 0;
		top: 0;
		z-index: 1;
		display: flex;
		.popup {
			width: 450px;
			background-color: #fefefe;
			border-radius: 10px;
			margin: auto;
			overflow: hidden;
			position: relative;
			& > span {
				font-size: 20px;
				display: block;
				padding: 30px 30px 40px;
				& > span {
					color: #ff0000;
				}
				b {
					font-size: 35px;
				}
			}
			.popup-links {
				display: flex;
				a {
					cursor: pointer;
					padding: 12px 0;
					display: block;
					width: 50%;
					text-align: center;
					color: #fff;
					font-weight: 700;
					&:first-child {
						background-color: #ff0000;
					}
					&:last-child {
						background-color: #92b01a;
					}
				}
			}
		}
	}
}
.remove {
	width: 15px;
	height: 15px;
	border-radius: 50%;
	background-color: #555;
	position: absolute;
	right: 10px;
	top: 10px;
	cursor: pointer;
	&:before,
	&:after {
		content: '';
		display: block;
		width: 9px;
		height: 2px;
		background-color: #fff;
		position: absolute;
		top: 7px;
	}
	&:before {
		left: 3px;
		transform: rotate(-45deg);
	}
	&:after {
		right: 3px;
		transform: rotate(45deg);
	}
	&:hover {
		background-color: #ff0000;
	}
}
</style>
