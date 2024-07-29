<template>
  <div class="pt-12 pb-32">
    <div class="container mx-auto px-4 md:px-0">
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900">Our offices</h2>
        <p class="my-6 leading-8 text-gray-600">
          Varius facilisi mauris sed sit. Non sed et duis dui leo,
          vulputate id malesuada non. Cras aliquet purus dui laoreet diam sed lacus, fames.
        </p>
      </div>
      <div class="flex flex-col md:flex-row gap-10">
        <form action="#" method="POST" class="w-full lg:flex-auto">
          <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label
                  for="first-name"
                  class="block text-sm font-semibold leading-6 text-gray-900">
                First name
              </label>
              <div class="mt-2.5">
                <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autocomplete="given-name"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mainColor sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                  for="last-name"
                  class="block text-sm font-semibold leading-6 text-gray-900">
                Last name
              </label>
              <div class="mt-2.5">
                <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autocomplete="family-name"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mainColor sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                  for="budget"
                  class="block text-sm font-semibold leading-6 text-gray-900">
                Budget
              </label>
              <div class="mt-2.5">
                <input
                    id="budget"
                    name="budget"
                    type="text"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mainColor sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                  for="website"
                  class="block text-sm font-semibold leading-6 text-gray-900">
                Website
              </label>
              <div class="mt-2.5">
                <input
                    type="url"
                    name="website"
                    id="website"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mainColor sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div class="sm:col-span-2">
              <label
                  for="message"
                  class="block text-sm font-semibold leading-6 text-gray-900">
                Message
              </label>
              <div class="mt-2.5">
                <textarea
                    id="message"
                    name="message"
                    rows="4"
                    class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mainColor sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div class="mt-10">
            <button type="submit"
                    class="block w-full rounded-md bg-mainColor px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mainColor">
              Let’s talk
            </button>
          </div>
          <p class="mt-4 text-sm leading-6 text-gray-500">By submitting this form, I agree to the <a href="#"
                                                                                                     class="font-semibold text-mainColor">privacy&nbsp;policy</a>.
          </p>
        </form>
        <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3A2658017259bf7f7cce1b93f48b8d155cbfd28d7197af5a8f15c55167e592f3ee&amp;source=constructor"
            width="100%"
            height="461"
            frameborder="0">
        </iframe>
      </div>
      <div
          class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-4">
        <div>
          <h3 class="border-l border-mainColor pl-6 font-semibold text-gray-900">Los Angeles</h3>
          <address class="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600">
            <p>4556 Brendan Ferry</p>
            <p>Los Angeles, CA 90210</p>
          </address>
        </div>
        <div>
          <h3 class="border-l border-mainColor pl-6 font-semibold text-gray-900">New York</h3>
          <address class="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600">
            <p>886 Walter Street</p>
            <p>New York, NY 12345</p>
          </address>
        </div>
        <div>
          <h3 class="border-l border-mainColor pl-6 font-semibold text-gray-900">Toronto</h3>
          <address class="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600">
            <p>7363 Cynthia Pass</p>
            <p>Toronto, ON N3Y 4H8</p>
          </address>
        </div>
        <div>
          <h3 class="border-l border-mainColor pl-6 font-semibold text-gray-900">London</h3>
          <address class="border-l border-gray-200 pl-6 pt-2 not-italic text-gray-600">
            <p>114 Cobble Lane</p>
            <p>London N1 2EF</p>
          </address>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>