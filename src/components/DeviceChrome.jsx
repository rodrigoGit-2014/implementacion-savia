/* Status bar y home indicator del frame de iOS (Figma: "Status bar",
   "Home indicator"). Son chrome del dispositivo: se muestran en viewports
   de teléfono y se ocultan desde tablet, donde no existe notch. */
export function StatusBar() {
  return (
    <div className="statusbar" aria-hidden="true">
      <p className="statusbar__time">9:41</p>
      <span className="statusbar__glyph statusbar__glyph--signal" />
      <span className="statusbar__glyph statusbar__glyph--wifi" />
      <span className="statusbar__glyph statusbar__glyph--battery" />
    </div>
  );
}

export function HomeIndicator() {
  return <span className="home-indicator" aria-hidden="true" />;
}
