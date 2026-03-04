<template>
  <div>
    <NavBar />
    <div class="contact-container">
      <div class="header-box">
        <h1>Contact Form</h1>
      </div>

      <form
        name="contact"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        class="contact-form"
        @submit.prevent="handleSubmit"
      >
        <input type="hidden" name="form-name" value="contact" />

        <p hidden>
          <label>
            Don’t fill this out:
            <input name="bot-field" />
          </label>
        </p>

        <div class="form-group">
          <label for="username">Name: </label>
          <input
            type="text"
            name="name"
            id="username"
            placeholder="Enter Name"
            v-model="formData.name"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="your.email@example.com"
            v-model="formData.email"
            required
          />
        </div>

        <div class="form-group">
          <label for="message">Message: </label>
          <textarea
            name="message"
            id="message"
            rows="5"
            placeholder="Your message"
            v-model="formData.message"
            required
          ></textarea>
        </div>

        <button type="submit" class="submit-button" :disabled="submitting">
          {{ submitting ? "Sending..." : "Send" }}
        </button>

        <div v-if="formStatus" :class="['form-status', formStatus.type]">
          {{ formStatus.message }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const formData = reactive({
  name: "",
  email: "",
  message: "",
});

const submitting = ref(false);
const formStatus = ref(null);

const handleSubmit = async () => {
  submitting.value = true;
  formStatus.value = null;

  const formDataToSend = new FormData();
  formDataToSend.append("form-name", "contact");
  formDataToSend.append("name", formData.name);
  formDataToSend.append("email", formData.email);
  formDataToSend.append("message", formData.message);

  try {
    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formDataToSend).toString(),
    });

    if (response.ok) {
      formData.name = "";
      formData.email = "";
      formData.message = "";

      formStatus.value = {
        type: "success",
        message: "Thank you! Your message has been sent.",
      };
    } else {
      throw new Error("Form submission failed");
    }
  } catch (error) {
    console.error("Form submission error:", error);
    formStatus.value = {
      type: "error",
      message: "Something went wrong.",
    };
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
* {
  font-family: "Roboto", sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
  font-variation-settings: "wdth" 100;
}

.contact-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  margin-top: 40px;
}

.header-box {
  border: 2px solid #333;
  padding: 20px;
  text-align: center;
  background-color: #f9f9f9;
  margin-bottom: 40px;
}

.header-box h1 {
  margin: 0;
  color: #333;
  font-weight: 500;
  font-size: 28px;
  letter-spacing: 1px;
}

.contact-form {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #555;
  font-size: 16px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 350;
  font-family: inherit;
  transition: border-color 0.3s ease;
  box-sizing: border-box;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #999;
}

.submit-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 14px 28px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}

.submit-button:active {
  transform: translateY(1px);
}

.submit-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.form-status {
  margin-top: 20px;
  padding: 12px;
  border-radius: 4px;
  text-align: center;
  font-weight: 400;
}

.form-status.success {
  background-color: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.form-status.error {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}
</style>
