function goTo(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 68, behavior: 'smooth' });
}

export function Nav({ names, showBudget }) {
  const links = [
    ['map', 'Map'],
    ['itinerary', 'Itinerary'],
    ['destinations', 'Hotels'],
    ['gallery', 'Gallery'],
    ['flights', 'Flights'],
    ['swaps', 'Swap Menu'],
    ['packing', 'Packing'],
    ['bucket', 'Bucket List'],
    ...(showBudget ? [['budget', 'Budget']] : []),
  ];

  return (
    <nav className="nav">
      <div className="nav-brand">{names} · 2027</div>
      <ul className="nav-links">
        {links.map(([id, label]) => (
          <li key={id}>
            <a
              href={'#' + id}
              onClick={(e) => {
                e.preventDefault();
                goTo(id);
              }}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
