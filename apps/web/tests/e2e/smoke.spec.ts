import { test, expect } from "@playwright/test";

test("homepage loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Mobiz/i);
});

test("homepage navigation works", async ({ page }) => {
  await page.goto("/");

  // Test hash anchor navigation to Our Model section
  await page.getByRole("link", { name: "Our Model" }).click();
  await expect(page).toHaveURL(/.*#model/);
  await expect(page.getByText("One Team. One Outcome.")).toBeVisible();

  // Test hash anchor navigation to Execution section
  await page.getByRole("link", { name: "Execution" }).click();
  await expect(page).toHaveURL(/.*#services/);
  await expect(page.getByText("Full-Stack Execution")).toBeVisible();

  // Test hash anchor navigation to Delivered Value section
  await page.getByRole("link", { name: "Delivered Value" }).click();
  await expect(page).toHaveURL(/.*#delivered/);
  await expect(page.getByText("Proof, Not Promises")).toBeVisible();

  // Test hash anchor navigation to Industries section
  await page.getByRole("link", { name: "Industries" }).click();
  await expect(page).toHaveURL(/.*#industries/);
  await expect(page.getByText("Industries We're Transforming")).toBeVisible();

  // Test navigation to Technology & Partners page
  await page.getByRole("link", { name: "Technology & Partners" }).click();
  await expect(page).toHaveURL(/.*technology-partners/);
  await expect(page.getByText("Technology-Agnostic")).toBeVisible();

  // Go back to homepage
  await page.goto("/");

  // Test that main sections are visible on homepage
  await expect(page.getByText("The Accountability Gap")).toBeVisible();
  await expect(page.getByText("Delivered Value.")).toBeVisible();
});

test("contact form works", async ({ page }) => {
  await page.goto("/");

  // Scroll to contact section
  await page.getByRole("link", { name: "Start" }).click();
  await expect(page).toHaveURL(/.*#contact/);

  // Click contact CTA button to open modal
  await page.getByRole("button", { name: "Start the Conversation" }).click();

  // Check that modal is open
  await expect(page.getByText("Name")).toBeVisible();
  await expect(page.getByText("Email")).toBeVisible();
  await expect(page.getByText("Message")).toBeVisible();

  // Fill out the form
  await page.getByLabel("Name").fill("Test User");
  await page.getByLabel("Email").fill("test@example.com");
  await page.getByLabel("Company").fill("Test Company");
  await page
    .getByLabel("Message")
    .fill("This is a test message from the automated test.");

  // Submit the form
  await page.getByRole("button", { name: "Send Message" }).click();

  // Check for success message
  await expect(page.getByText("Thank you!")).toBeVisible();
  await expect(
    page.getByText("Your message has been sent successfully"),
  ).toBeVisible();
});
