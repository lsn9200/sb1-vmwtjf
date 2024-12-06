export const PUBLIC_IMAGES = {
  asdaTruck: 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?auto=format&fit=crop&w=800&q=80',
  employeeStock: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
  financialGraph: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
  stockChart: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
  computershareLogo: 'https://raw.githubusercontent.com/computershare-group/brand-assets/main/logo/computershare-purple.png'
} as const;

export const SERVICE_CARDS = [
  {
    title: 'ASPP',
    subtitle: 'Associate Stock',
    description: 'Purchase Plan',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80',
    loginUrl: '/aspp-login',
    alt: 'Professional team collaborating in modern office'
  },
  {
    title: 'ASDA',
    subtitle: 'Colleague Plans',
    description: '',
    image: 'https://images.unsplash.com/photo-1591768793355-74d04bb6608f?auto=format&fit=crop&w=800&q=80',
    loginUrl: '/asda-login',
    alt: 'Modern delivery truck on the road'
  },
  {
    title: 'Stock Awards-Vested',
    subtitle: 'Stock Options,',
    description: 'RSRs, PSPs',
    note: '(Only if you hold shares at Computershare)',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    loginUrl: '/login',
    alt: 'Financial data and stock market analysis'
  },
  {
    title: 'DSPP',
    subtitle: 'Direct Stock',
    description: 'Purchase Plan',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80',
    loginUrl: '/dspp-login',
    alt: 'Stock market chart showing growth'
  }
] as const;