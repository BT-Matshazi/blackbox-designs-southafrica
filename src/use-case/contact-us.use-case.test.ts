import { describe, expect, it, vi } from "vitest";
import { ContactUsUseCase } from "@/src/use-case/contact-us.use-case";
import { LeadRepository } from "@/src/application/interface/lead.repository";
import { ContactUsRepository } from "@/src/application/interface/contact-us.repository";

const baseData = {
  firstName: "Thandi",
  lastName: "Ndlovu",
  email: "thandi@example.com",
  company: "",
  phone: "",
  message: "I need a website for my new business.",
  projectType: "Web Development",
  budgetRange: "R25k – R50k",
};

function makeMocks({ saveOk = true, emailOk = true } = {}) {
  const calls: string[] = [];
  const leadRepo: LeadRepository = {
    save: vi.fn(async () => {
      calls.push("save");
      return saveOk
        ? { success: true, id: "lead-1" }
        : { success: false, error: "db down" };
    }),
    findAll: vi.fn(async () => []),
    updateStatus: vi.fn(async () => ({ success: true })),
  };
  const emailRepo: ContactUsRepository = {
    sendContactUsEmail: vi.fn(async () => {
      calls.push("email");
      return emailOk
        ? { success: true, messageId: "msg-1" }
        : { success: false, error: "smtp down" };
    }),
  };
  return { leadRepo, emailRepo, calls };
}

describe("ContactUsUseCase", () => {
  it("saves the lead before sending the email, tagged source=contact", async () => {
    const { leadRepo, emailRepo, calls } = makeMocks();
    const useCase = new ContactUsUseCase(emailRepo, leadRepo);

    const result = await useCase.execute(baseData);

    expect(result.success).toBe(true);
    expect(calls).toEqual(["save", "email"]);
    expect(leadRepo.save).toHaveBeenCalledWith(
      expect.objectContaining({
        firstName: "Thandi",
        email: "thandi@example.com",
        source: "contact",
      }),
    );
  });

  it("still succeeds when the email fails but the lead was saved", async () => {
    const { leadRepo, emailRepo } = makeMocks({ emailOk: false });
    const useCase = new ContactUsUseCase(emailRepo, leadRepo);
    const result = await useCase.execute(baseData);
    expect(result.success).toBe(true);
  });

  it("still succeeds when persistence fails but the email was sent", async () => {
    const { leadRepo, emailRepo } = makeMocks({ saveOk: false });
    const useCase = new ContactUsUseCase(emailRepo, leadRepo);
    const result = await useCase.execute(baseData);
    expect(result.success).toBe(true);
  });

  it("fails when both persistence and email fail", async () => {
    const { leadRepo, emailRepo } = makeMocks({ saveOk: false, emailOk: false });
    const useCase = new ContactUsUseCase(emailRepo, leadRepo);
    const result = await useCase.execute(baseData);
    expect(result.success).toBe(false);
    expect(result.error).toBeTruthy();
  });

  it("accepts empty phone and company (they are optional in the UI)", async () => {
    const { leadRepo, emailRepo } = makeMocks();
    const useCase = new ContactUsUseCase(emailRepo, leadRepo);
    const result = await useCase.execute({ ...baseData, phone: "", company: "" });
    expect(result.success).toBe(true);
  });

  it("rejects a submission with no message and touches nothing", async () => {
    const { leadRepo, emailRepo } = makeMocks();
    const useCase = new ContactUsUseCase(emailRepo, leadRepo);
    const result = await useCase.execute({ ...baseData, message: "" });
    expect(result.success).toBe(false);
    expect(leadRepo.save).not.toHaveBeenCalled();
    expect(emailRepo.sendContactUsEmail).not.toHaveBeenCalled();
  });
});
