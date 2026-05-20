"use client";

import { useEffect, useState } from "react";
import { attributionToFormFields } from "@/lib/contact-attribution";

/**
 * Renders hidden form inputs for stored ad attribution (click IDs, UTM
 * params, Meta pixel cookies). Drop inside any <form> that needs to
 * carry attribution data to a server action or REST endpoint.
 *
 * Reads from cookies set by <AttributionTracker /> mounted in the root
 * layout. Renders nothing during SSR (cookies are browser-only) — fields
 * populate after hydration.
 *
 * Server side: extract with attributionFromFormData(formData) from
 * lib/contact-attribution.
 */
export function AttributionFields() {
  const [fields, setFields] = useState<Array<{ name: string; value: string }>>([]);

  useEffect(() => {
    setFields(attributionToFormFields());
  }, []);

  return (
    <>
      {fields.map((f) => (
        <input key={f.name} type="hidden" name={f.name} value={f.value} />
      ))}
    </>
  );
}
