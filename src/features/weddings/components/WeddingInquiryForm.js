import { useEffect, useId } from "react";
import { Link } from "react-router-dom";
import { useForm, ValidationError } from "@formspree/react";
import { trackEvent, ANALYTICS_EVENTS } from "../../../utils/analytics";

// Wedding inquiry form, staged as three quiet movements — You / The Day /
// The Feeling — rather than one field wall. Posts to the same verified
// production Formspree form ("xdabqdyq") as every other lead path in this
// codebase, tagged with `_subject` + `source` (the established
// HandoffForm.js / FreeGuidePage.js convention) so wedding leads read
// distinctly in the inbox. Field names are unchanged from V1 — do not
// rename them, the inbox history depends on them. No new vendor, no
// backend.

const inputClasses =
  "w-full border border-white/20 bg-white px-5 py-4 text-zinc-950 outline-none transition focus:border-[#d8a15f] focus-visible:ring-2 focus-visible:ring-[#d8a15f]";
const labelClasses = "mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60";

function Field({ id, label, optionalTag, children }) {
  return (
    <div>
      <label htmlFor={id} className={labelClasses}>
        {label}
        {optionalTag && <span className="ml-2 normal-case tracking-normal text-white/35">{optionalTag}</span>}
      </label>
      {children}
    </div>
  );
}

function SelectField({ id, name, label, options, placeholder, required = false }) {
  return (
    <Field id={id} label={label}>
      <div className="relative">
        <select
          id={id}
          name={name}
          required={required}
          defaultValue=""
          className={`${inputClasses} appearance-none pr-12`}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-xs text-zinc-500"
        >
          ▾
        </span>
      </div>
    </Field>
  );
}

function GroupHeading({ number, title }) {
  return (
    <div className="flex items-baseline gap-4 border-b border-white/15 pb-4">
      <span className="text-[11px] font-semibold tracking-[0.3em] text-[#d8a15f]">{number}</span>
      <h2 className="ptm-editorial text-2xl tracking-[-0.02em] text-white md:text-3xl">{title}</h2>
    </div>
  );
}

export default function WeddingInquiryForm({ t, lang }) {
  const [state, handleSubmit] = useForm("xdabqdyq");
  const uid = useId();
  const fieldId = (name) => `${uid}-${name}`;

  useEffect(() => {
    if (state.succeeded) {
      trackEvent(ANALYTICS_EVENTS.WEDDINGS_INQUIRY_SUBMITTED, { language: lang });
    }
  }, [state.succeeded, lang]);

  if (state.succeeded) {
    return (
      <div className="text-center lg:text-left">
        <h2 className="text-4xl font-light leading-tight tracking-[-0.05em] md:text-6xl">{t.successTitle}</h2>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/65">{t.successText}</p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
          <Link
            to="/weddings"
            className="bg-white px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-[#d8a15f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            {t.successBack}
          </Link>
          <Link
            to="/guides/living-in-the-yucatan-peninsula"
            className="border border-white/30 px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
          >
            {t.successExplore}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-14 text-left">
      <input type="hidden" name="_subject" value="Wedding Inquiry" />
      <input type="hidden" name="source" value="weddings" />
      <input type="hidden" name="language" value={lang} />

      {/* 01 — You */}
      <div className="grid gap-7">
        <GroupHeading number="01" title={t.groupYou} />
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id={fieldId("coupleNames")} label={t.labels.coupleNames}>
            <input id={fieldId("coupleNames")} type="text" name="coupleNames" placeholder={t.placeholders.coupleNames} required className={inputClasses} />
            <ValidationError field="coupleNames" errors={state.errors} />
          </Field>
          <Field id={fieldId("email")} label={t.labels.email}>
            <input id={fieldId("email")} type="email" name="email" placeholder={t.placeholders.email} required className={inputClasses} />
            <ValidationError field="email" errors={state.errors} />
          </Field>
          <Field id={fieldId("phone")} label={t.labels.phone} optionalTag={t.optionalTag}>
            <input id={fieldId("phone")} type="tel" name="phoneWhatsapp" placeholder={t.placeholders.phone} className={inputClasses} />
          </Field>
          <Field id={fieldId("country")} label={t.labels.country}>
            <input id={fieldId("country")} type="text" name="country" placeholder={t.placeholders.country} required className={inputClasses} />
          </Field>
        </div>
      </div>

      {/* 02 — The Day */}
      <div className="grid gap-7">
        <GroupHeading number="02" title={t.groupDay} />
        <div className="grid gap-6 sm:grid-cols-2">
          <Field id={fieldId("weddingDate")} label={t.labels.weddingDate}>
            <input id={fieldId("weddingDate")} type="text" name="weddingDate" placeholder={t.placeholders.weddingDate} required className={inputClasses} />
          </Field>
          <SelectField
            id={fieldId("flexibleDates")}
            name="flexibleDates"
            label={t.labels.flexibleDates}
            options={t.options.flexibleDates}
            placeholder={t.options.select}
            required
          />
          <SelectField
            id={fieldId("guestCount")}
            name="guestCount"
            label={t.labels.guestCount}
            options={t.options.guestCount}
            placeholder={t.options.select}
            required
          />
          <SelectField
            id={fieldId("ceremonyType")}
            name="ceremonyType"
            label={t.labels.ceremonyType}
            options={t.options.ceremonyType}
            placeholder={t.options.select}
            required
          />
          <SelectField
            id={fieldId("setting")}
            name="preferredSetting"
            label={t.labels.setting}
            options={t.options.setting}
            placeholder={t.options.select}
            required
          />
          <SelectField
            id={fieldId("scope")}
            name="experienceScope"
            label={t.labels.scope}
            options={t.options.scope}
            placeholder={t.options.select}
            required
          />
          <SelectField
            id={fieldId("legalAssistance")}
            name="legalMarriageAssistance"
            label={t.labels.legalAssistance}
            options={t.options.legalAssistance}
            placeholder={t.options.select}
            required
          />
        </div>
      </div>

      {/* 03 — The Feeling */}
      <div className="grid gap-7">
        <GroupHeading number="03" title={t.groupFeeling} />
        <div className="grid gap-6">
          <div className="sm:max-w-[calc(50%-0.75rem)]">
            <SelectField
              id={fieldId("budgetRange")}
              name="budgetRange"
              label={t.labels.budgetRange}
              options={t.options.budgetRange}
              placeholder={t.options.select}
              required
            />
          </div>
          <Field id={fieldId("feeling")} label={t.labels.feeling}>
            <textarea
              id={fieldId("feeling")}
              name="feeling"
              placeholder={t.placeholders.feeling}
              required
              className={`${inputClasses} min-h-40`}
            />
            <ValidationError field="feeling" errors={state.errors} />
          </Field>
          <Field id={fieldId("anythingElse")} label={t.labels.anythingElse} optionalTag={t.optionalTag}>
            <textarea
              id={fieldId("anythingElse")}
              name="anythingElse"
              placeholder={t.placeholders.anythingElse}
              className={`${inputClasses} min-h-28`}
            />
          </Field>
        </div>
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="bg-white px-8 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-950 transition hover:bg-[#d8a15f] disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d8a15f] focus-visible:ring-offset-2"
      >
        {state.submitting ? t.submitting : t.submit}
      </button>
    </form>
  );
}
