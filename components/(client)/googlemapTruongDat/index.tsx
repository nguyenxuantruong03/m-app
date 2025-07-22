const GoogleMapTruongDat = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <iframe
        className="max-w-7xl mx-auto w-full h-[450px] rounded-md shadow-md"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4576948869462!2d106.60182497542921!3d10.776214389372573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752c6b3c74b0ab%3A0x2e2073284c6c439c!2zQ-G7rWEgSMOgbmcgxJBp4buHbiBOxrDhu5tjIFRyxrDhu51uZyDEkOG6oXQ!5e0!3m2!1svi!2s!4v1753152127888!5m2!1svi!2s"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map Truong Dat"
      />
    </div>
  );
};

export default GoogleMapTruongDat;
