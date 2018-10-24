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
			
			<div v-for="field in fields" class="form-group">
				<label for="name">{{ field.type }}</label>
				<input type="text" name="name" id="name" v-model="field.value">
			</div>

			<div>
				<a href="#" @click.prevent="checkForm" class="submitLink">KAYDET</a>
			</div>

		</div>

		<span class="and">ya da</span>
			
		<a @click="addNewField" class="addNewField">YENİ ALAN EKLE</a>

		<div v-if="addField" class="newField">
			<input type="text" @keyup.enter="saveNewField" ref="saveNewField" v-model="newFieldValue">
		</div>

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
				addField: false,
				success: {
					status: false,
					message: ''
				}
			}
		},
		methods: {
			addNewField() {
				this.addField = ! this.addField;
				this.$nextTick(() => {
					if (this.addField) this.$refs.saveNewField.focus();
				});
			},
			saveNewField() {
				this.addField = false;
				this.fields.push({ type: this.newFieldValue, required: true, value: '' });
				this.newFieldValue = '';
			},
			checkForm:function() {
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
}
</style>
