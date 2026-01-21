import { render, screen, fireEvent } from '@testing-library/react'
import GDVGridItem from '@/components/GDVGridItem'
import { GDV } from '@/lib/types'

describe('GDVGridItem', () => {
  const mockGdv: GDV = {
    id: '1',
    ho_ten: 'Nguyễn Văn A',
    sdt: '0901234567',
    email: 'test@example.com',
    chi_nhanh: 'Chi nhánh Hà Nội',
    avatar_url: null,
  }

  const mockOnClick = jest.fn()

  beforeEach(() => {
    mockOnClick.mockClear()
  })

  it('renders GDV grid item with correct information', () => {
    render(<GDVGridItem gdv={mockGdv} index={0} onClick={mockOnClick} />)
    
    // Check if name and index are displayed
    expect(screen.getByText(/#1 - Nguyễn Văn A/)).toBeInTheDocument()
  })

  it('displays first letter of name when no avatar URL', () => {
    render(<GDVGridItem gdv={mockGdv} index={0} onClick={mockOnClick} />)
    
    // Check if first letter is displayed
    expect(screen.getByText('N')).toBeInTheDocument()
  })

  it('displays avatar image when avatar URL is provided', () => {
    const gdvWithAvatar = {
      ...mockGdv,
      avatar_url: 'https://example.com/avatar.jpg',
    }
    
    render(<GDVGridItem gdv={gdvWithAvatar} index={0} onClick={mockOnClick} />)
    
    const image = screen.getByAltText('Nguyễn Văn A')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', 'https://example.com/avatar.jpg')
  })

  it('calls onClick when clicked', () => {
    render(<GDVGridItem gdv={mockGdv} index={0} onClick={mockOnClick} />)
    
    const gridItem = screen.getByRole('button')
    fireEvent.click(gridItem)
    
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClick when Enter key is pressed', () => {
    render(<GDVGridItem gdv={mockGdv} index={0} onClick={mockOnClick} />)
    
    const gridItem = screen.getByRole('button')
    fireEvent.keyDown(gridItem, { key: 'Enter' })
    
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClick when Space key is pressed', () => {
    render(<GDVGridItem gdv={mockGdv} index={0} onClick={mockOnClick} />)
    
    const gridItem = screen.getByRole('button')
    fireEvent.keyDown(gridItem, { key: ' ' })
    
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('displays correct index for different positions', () => {
    const { rerender } = render(<GDVGridItem gdv={mockGdv} index={0} onClick={mockOnClick} />)
    expect(screen.getByText(/#1 - Nguyễn Văn A/)).toBeInTheDocument()
    
    rerender(<GDVGridItem gdv={mockGdv} index={5} onClick={mockOnClick} />)
    expect(screen.getByText(/#6 - Nguyễn Văn A/)).toBeInTheDocument()
  })

  it('has correct accessibility attributes', () => {
    render(<GDVGridItem gdv={mockGdv} index={0} onClick={mockOnClick} />)
    
    const gridItem = screen.getByRole('button')
    expect(gridItem).toHaveAttribute('aria-label', 'Xem chi tiết Nguyễn Văn A')
    expect(gridItem).toHaveAttribute('tabIndex', '0')
  })
})
