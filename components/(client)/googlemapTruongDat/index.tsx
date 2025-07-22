"use client";
import { root } from "@/components/(client)/color/color";
import Container from "@/components/ui/container";
import { FeedbackForm } from "../dropmenu-hint/feedback/form-feedback";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { PolicyViolationModal } from "../modal/policy-violation-modal";
import LoadingPageComponent from "@/components/ui/loading";

const GoogleMapTruongDat = () => {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [policiViolationModal, setPoliciViolationModal] = useState(false);

  return (
    <>
      <PolicyViolationModal
        isOpen={policiViolationModal}
        onClose={() => setPoliciViolationModal(false)}
        value={content}
      />
      <div className={`${root.bgwhite} p-2`}>
        <Container>
          <div className="xl:grid xl:grid-cols-2 space-y-2 xl:space-y-0 xl:gap-x-2">
            <iframe
              className="max-w-7xl mx-auto w-full h-[450px] rounded-md shadow-md overflow-hidden"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4576948869462!2d106.60182497542921!3d10.776214389372573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752c6b3c74b0ab%3A0x2e2073284c6c439c!2zQ-G7rWEgSMOgbmcgxJBp4buHbiBOxrDhu5tjIFRyxrDhu51uZyDEkOG6oXQ!5e0!3m2!1svi!2s!4v1753152127888!5m2!1svi!2s"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Truong Dat"
            />

            <div className="rounded-md bg-slate-200 bg-opacity-70 dark:bg-slate-800 dark:bg-opacity-100 shadow-sm p-3 overflow-y-auto items-center h-[450px]">
              {loading ? (
                <LoadingPageComponent />
              ) : (
                <FeedbackForm
                  withSheet={false}
                  content={content}
                  setContent={setContent}
                  loading={loading}
                  setLoading={setLoading}
                />
              )}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default GoogleMapTruongDat;
