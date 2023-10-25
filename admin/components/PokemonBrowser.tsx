import Link from 'next/link'
import Image from 'next/image'

interface PokemonBrowserProps {
    previousId: number | null,
    nextId: number | null
}

export default function PokemonBrowser({previousId, nextId}: PokemonBrowserProps) {
    return (
        <div style={{ display: 'flex', margin: '1rem'}}>
            {
                previousId !== null && (
                    <Link 
                        href={`/pokemon/${previousId}`}>
                        <Image 
                            src={'/icons/last.png'}
                            width={32}
                            height={32}
                            alt='Previous icon'/>
                    </Link>
                )
            }
            {
                nextId !== null && (
                    <Link 
                        href={`/pokemon/${nextId}`}
                        style={{marginLeft: 'auto'}}>
                        <Image
                                src={'/icons/next.png'}
                                width={32}
                                height={32}
                                alt='Next icon'/>
                    </Link>
                )
            }
        </div>
    )
}